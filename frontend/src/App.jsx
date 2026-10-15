import { useEffect, useState } from "react";

const modules = [
  ["Номерной фонд", "Список номеров, цены и свободные даты"],
  ["Гости", "Контакты гостей и поиск"],
  ["Бронирования", "Брони, заселение и выезд"],
  ["Сводка", "Показатели загрузки отеля"]
];

export default function App() {
  const [status, setStatus] = useState("Проверяем API...");
  useEffect(() => {
    fetch("/api/health")
      .then(r => { if (!r.ok) throw Error("Offline"); return r.json(); })
      .then(data => setStatus(data.status === "UP" ? "API подключён" : "API недоступен"))
      .catch(() => setStatus("API не запущен"));
  }, []);
  return <div className="layout">
    <aside><h1>ZEVS</h1><p>Hotel CRM</p><nav>Обзор</nav><nav>Номера</nav><nav>Гости</nav><nav>Бронирования</nav></aside>
    <main>
      <header><div><small>ZEVS · HOTEL CRM</small><h2>Управление гостиницей</h2></div><span>{status}</span></header>
      <section className="hero"><h3>CRM для небольшого отеля</h3><p>Управление номерным фондом, гостями и бронированиями.</p></section>
      <div className="cards">{modules.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p><em>Раздел</em></article>)}</div>
      
    </main>
  </div>;
}
