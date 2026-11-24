<?php
// Обработчик заявок с сайта → Telegram (и, по желанию, на почту).
// Форма (src/components/ContactForm.tsx) шлёт POST JSON на PUBLIC_FORM_ENDPOINT.
//
// Установка (хостинг с PHP 7.4+, например Beget / Timeweb):
//   1. Скопировать этот файл в public/api/send.php (попадёт в dist/api/send.php при сборке)
//      или положить прямо на сервер в /api/send.php.
//   2. Рядом создать send.config.php по образцу send.config.example.php (токен бота, chat_id).
//      В git и в публичные архивы его не класть.
//   3. В .env: PUBLIC_FORM_ENDPOINT=/api/send.php  → npm run build → выложить dist/.
//
// Ответ: 200 {"ok":true} — заявка доставлена; иначе 4xx/5xx — форма покажет ошибку
// и предложит WhatsApp/телефон. Ложного «отправлено» нет.

declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function reply(int $code, array $body): void {
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') reply(405, ['ok' => false, 'error' => 'method']);

$cfgFile = __DIR__ . '/send.config.php';
if (!is_file($cfgFile)) reply(500, ['ok' => false, 'error' => 'config']);
$cfg = require $cfgFile;

$raw = file_get_contents('php://input', false, null, 0, 20000) ?: '';
$d = json_decode($raw, true);
if (!is_array($d)) reply(400, ['ok' => false, 'error' => 'json']);

// ловушка для ботов: настоящий посетитель поле website не видит
if (!empty($d['website'])) reply(200, ['ok' => true]);

$s = fn(string $k, int $max = 300): string => mb_substr(trim((string)($d[$k] ?? '')), 0, $max);
$name = $s('name', 120);
$email = $s('email', 160);
$phone = $s('phone', 40);
if ($name === '' || ($email === '' && $phone === '') || empty($d['consent'])) {
    reply(422, ['ok' => false, 'error' => 'fields']);
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) reply(422, ['ok' => false, 'error' => 'email']);

// простое ограничение частоты: не чаще раза в 20 секунд с одного IP
$ip = $_SERVER['REMOTE_ADDR'] ?? '0';
$lock = sys_get_temp_dir() . '/atg-form-' . md5($ip);
if (is_file($lock) && time() - (int)filemtime($lock) < 20) reply(429, ['ok' => false, 'error' => 'rate']);
@touch($lock);

$role = ($d['role'] ?? '') === 'supplier' ? 'Поставщик (хозяйство)' : 'Покупатель';
$lines = array_filter([
    '🌾 Заявка с сайта (' . ($s('lang', 2) === 'en' ? 'EN' : 'RU') . ')',
    'Кто: ' . $role,
    'Имя: ' . $name,
    $s('company', 160) !== '' ? 'Компания: ' . $s('company', 160) : null,
    $email !== '' ? 'Почта: ' . $email : null,
    $phone !== '' ? 'Телефон: ' . $phone : null,
    $s('country', 80) !== '' ? 'Страна: ' . $s('country', 80) : null,
    $s('cropName', 80) !== '' ? 'Культура: ' . $s('cropName', 80) : null,
    $s('volume', 20) !== '' ? 'Объём, т: ' . $s('volume', 20) : null,
    $s('message', 2000) !== '' ? "Сообщение:\n" . $s('message', 2000) : null,
    $s('page', 300) !== '' ? 'Страница: ' . $s('page', 300) : null,
]);
$text = implode("\n", $lines);

$sent = false;

// Telegram
if (!empty($cfg['telegram_token']) && !empty($cfg['telegram_chat_id'])) {
    $ch = curl_init('https://api.telegram.org/bot' . $cfg['telegram_token'] . '/sendMessage');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => ['chat_id' => $cfg['telegram_chat_id'], 'text' => $text, 'disable_web_page_preview' => 'true'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
    ]);
    $res = json_decode((string)curl_exec($ch), true);
    curl_close($ch);
    $sent = !empty($res['ok']);
}

// Почта (если указана) — запасной канал
if (!empty($cfg['mail_to'])) {
    $headers = "Content-Type: text/plain; charset=utf-8\r\n";
    if (!empty($cfg['mail_from'])) $headers .= 'From: ' . $cfg['mail_from'] . "\r\n";
    if ($email !== '') $headers .= 'Reply-To: ' . $email . "\r\n";
    $subject = '=?UTF-8?B?' . base64_encode('Заявка с сайта: ' . $name) . '?=';
    $sent = mail($cfg['mail_to'], $subject, $text, $headers) || $sent;
}

$sent ? reply(200, ['ok' => true]) : reply(502, ['ok' => false, 'error' => 'delivery']);
