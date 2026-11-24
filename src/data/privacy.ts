// Текст политики перенесён со старого сайта atg56.ru без изменений смысла, оператор — новое юрлицо из брифа.
// Перед запуском его стоит проверить юристу на соответствие 152-ФЗ (см. CONTENT_GAPS.md).
import type { Lang } from '@/i18n/routes';

export const privacy: Record<Lang, string[]> = {
  ru: [
    'Любая информация, переданная Сторонами друг другу при пользовании ресурсами Сайта, является конфиденциальной информацией.',
    'Пользователь дает разрешение Администрации Сайта (ООО «Оренбург АгроАльянс») на сбор, обработку и хранение своих личных персональных данных.',
    'Стороны обязуются соблюдать данное соглашение, регламентирующее правоотношения, связанные с установлением, изменением и прекращением режима конфиденциальности в отношении личной информации Сторон, и не разглашать конфиденциальную информацию третьим лицам.',
    'Администрация Сайта (ООО «Оренбург АгроАльянс») очень серьезно относится к защите персональных данных Пользователя и никогда не предоставляет персональную информацию Пользователя кому бы то ни было, кроме случаев, когда этого прямо требует уполномоченный государственный орган (например, по письменному запросу суда). Вся персональная информация Пользователя используется для связи с ним, для исполнения сделки, заключенной между Пользователями Сайта с помощью ресурсов Сайта, для анализа посещаемости Сайта, для разработки предложений по его улучшению и развитию и может быть раскрыта иным третьим лицам только с его разрешения.',
    'Администрация Сайта (ООО «Оренбург АгроАльянс») осуществляет защиту персональной информации Пользователя, применяя общепринятые методы безопасности для обеспечения защиты информации от потери, искажения и несанкционированного распространения. Безопасность реализуется программными средствами сетевой защиты, процедурами проверки доступа, применением криптографических средств защиты информации, соблюдением политики конфиденциальности.',
  ],
  en: [
    'Any information that the Parties pass to each other while using the resources of the Website is confidential information.',
    'The User authorises the Website Administration (Orenburg AgroAlliance LLC) to collect, process and store their personal data.',
    'The Parties undertake to comply with this agreement, which governs the establishment, change and termination of confidentiality in respect of the Parties’ personal information, and not to disclose confidential information to third parties.',
    'The Website Administration (Orenburg AgroAlliance LLC) takes the protection of the User’s personal data very seriously and never provides the User’s personal information to anyone, except where this is expressly required by an authorised public authority (for example, upon a written court request). All personal information of the User is used to contact them, to perform a transaction concluded between Users of the Website by means of its resources, to analyse Website traffic and to develop proposals for its improvement, and may be disclosed to other third parties only with the User’s permission.',
    'The Website Administration (Orenburg AgroAlliance LLC) protects the User’s personal information using generally accepted security methods to prevent its loss, distortion and unauthorised distribution. Security is ensured by network protection software, access control procedures, cryptographic protection of information and adherence to this privacy policy.',
  ],
};
