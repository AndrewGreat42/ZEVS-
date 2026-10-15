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
    <aside><h1>ZEVS</h1><p>Hotel CRM</p><nav>Обзор проекта</nav><nav>Номера — планируется</nav><nav>Гости — планируется</nav><nav>Брони — планируется</nav></aside>
    <main>
      <header><div><small>УЧЕБНЫЙ ПРОЕКТ</small><h2>Управление гостиницей</h2></div><span>{status}</span></header>
      <section className="hero"><h3>CRM для небольшого отеля</h3><p>Начальный интерфейс: бизнес-функции находятся в разработке.</p></section>
      <div className="cards">{modules.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p><em>Запланировано</em></article>)}</div>
      <footer>Документация и план работ — в корне репозитория GitHub.</footer>
    </main>
  </div>;
}
