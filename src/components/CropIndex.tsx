// Культуры: большая фото-сцена + указатель названий.
// Точный указатель (мышь): наведение или фокус меняет кадр на сцене. Смена — CSS-переходы
// (прерываемые): входящий кадр проявляется из лёгкого размытия и масштаба 1.04, уходящий гаснет.
// Последний выбранный кадр остаётся — сцена не пустеет, когда курсор ушёл.
// Тач и узкий экран: лента карточек с фото и прокруткой по щелчкам.
import { useState } from 'react';

export interface CropItem {
  id: string;
  name: string;
  note?: string;
  group: string;
  href: string;
  img?: string;
  card?: string;
}
export interface CropGroup {
  id: string;
  label: string;
  items: CropItem[];
}

interface Props {
  groups: CropGroup[];
  noPhoto: string;
}

export default function CropIndex({ groups, noPhoto }: Props) {
  const all = groups.flatMap((g) => g.items);
  const [active, setActive] = useState(all[0]?.id);
  const cur = all.find((i) => i.id === active) ?? all[0];

  return (
    <div className="ci">
      {/* Сцена — только для широкого экрана с мышью */}
      <div className="ci__stage" aria-hidden="true">
        <div className="ci__frame">
          {all.map((i) =>
            i.img ? (
              <img key={i.id} src={i.img} alt="" data-on={i.id === cur.id ? '' : undefined} loading="lazy" decoding="async" />
            ) : (
              <div key={i.id} className="ci__blank" data-on={i.id === cur.id ? '' : undefined}>
                <span>{noPhoto}</span>
              </div>
            ),
          )}
          <div className="ci__caption glass">
            <span className="ci__cap-group">{cur.group}</span>
            <span className="ci__cap-name">{cur.name}</span>
            {cur.note && <span className="ci__cap-note">{cur.note}</span>}
          </div>
        </div>
      </div>

      {/* Указатель */}
      <div className="ci__index">
        {groups.map((g) => (
          <div className="ci__group" key={g.id}>
            <p className="ci__label">{g.label}</p>
            <ul className="ci__list" role="list">
              {g.items.map((item) => (
                <li key={item.id}>
                  <a
                    className="ci__item"
                    href={item.href}
                    data-active={item.id === cur.id ? '' : undefined}
                    onPointerEnter={() => setActive(item.id)}
                    onFocus={() => setActive(item.id)}
                  >
                    <span className="ci__name">{item.name}</span>
                    {item.note && <span className="ci__note">{item.note}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Лента карточек — тач и узкий экран */}
      <ul className="ci__strip" role="list">
        {all.map((i) => (
          <li key={i.id}>
            <a className="ci__card" href={i.href}>
              {i.card ? <img src={i.card} alt="" loading="lazy" decoding="async" width={480} height={600} /> : <span className="ci__blank" data-on=""><span>{noPhoto}</span></span>}
              <span className="ci__card-body">
                <span className="ci__cap-group">{i.group}</span>
                <span className="ci__card-name">{i.name}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
