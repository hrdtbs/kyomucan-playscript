import "./style.css";
import dayjs from "dayjs";

const today = dayjs();

const app = document.querySelector("#app");

const makeCalendar = (today) => {
  const daysInMonth = today.daysInMonth();

  const firstDay = today.set("date", 1);

  const firstWeekday = firstDay.day();

  const calendar = document.createElement("div");

  calendar.classList = "calendar";

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  Array.from({ length: 7 }).forEach((_, i) => {
    const weekday = document.createElement("button");
    weekday.textContent = weekdays[i];
    weekday.addEventListener("click", () => {
      document.querySelectorAll(`[data-w='${i}']`).forEach((el) => {
        if (weekday.classList.contains("selected")) {
          el.classList.remove("selected");
        } else {
          el.classList.add("selected");
        }
      });
      if (weekday.classList.contains("selected")) {
        weekday.classList.remove("selected");
      } else {
        weekday.classList.add("selected");
      }
    });
    calendar.appendChild(weekday);
  });

  Array.from({ length: firstWeekday }).forEach(() => {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  });

  Array.from({ length: daysInMonth }, (_, i) => i).map((day) => {
    const dayElement = document.createElement("button");
    dayElement.innerText = day + 1;
    dayElement.dataset.w = today.set("date", day + 1).day();
    dayElement.classList.add("day");
    dayElement.addEventListener("click", () => {
      dayElement.classList.toggle("selected");
    });
    calendar.appendChild(dayElement);
  });

  const monthLabel = document.createElement("div");
  monthLabel.classList = "month-label";
  monthLabel.innerText = today.format("MM/YYYY");
  app.insertAdjacentElement("afterbegin", monthLabel);
  app.insertAdjacentElement("beforeend", calendar);

  const downloadButton = document.createElement("button");
  downloadButton.innerText = "Copy to clipboard";
  downloadButton.classList = "download-button";
  downloadButton.addEventListener("click", async () => {
    const text = `officeWork: {
        days: [${Array.from(document.querySelectorAll(".day.selected"))
          .map((el) => el.innerText)
          .join(", ")}],
      },`;
    await navigator.clipboard.writeText(text);
  });
  app.insertAdjacentElement("beforeend", downloadButton);
};

makeCalendar(today);
