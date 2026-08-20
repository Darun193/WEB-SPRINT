// Получаем элементы со страницы
const resultsContainer = document.querySelector("#results-container");
const searchInput = document.querySelector("#search-input");
const statusSelect = document.querySelector("#status-filter");
const accuracyElement = document.querySelector("#accuracy");

// Здесь будут храниться данные из recognitions.json
let recognitions = [];


// Создаём кнопку обновления данных
const refreshButton = document.createElement("button");
refreshButton.textContent = "Обновить данные";
resultsContainer.before(refreshButton);


// Повторно загружаем данные по кнопке
refreshButton.addEventListener("click", () => {
  loadRecognitions();
});

// Обрабатываем клик по карточке
resultsContainer.addEventListener("click", (event) => {
  // Ищем карточку, по которой кликнули
  const card = event.target.closest(
    "article[data-id]"
  );

  if (!card) {
    return;
  }

  // Получаем id карточки
  const recognitionId = Number(
    card.dataset.id
  );

  // Ищем объект с таким id в массиве
  const recognition = recognitions.find(
    (item) => {
      return item.id === recognitionId;
    }
  );

  if (!recognition) {
    return;
  }

  // Меняем статус карточки
  recognition.status = getNextStatus(
    recognition.status
  );

  // Перерисовываем страницу
  updateResults();
});


// При вводе текста обновляем результаты
searchInput.addEventListener("input", () => {
  updateResults();
});


// При смене статуса обновляем результаты
statusSelect.addEventListener("change", () => {
  updateResults();
});



// Считаем процент правильных среди проверенных карточек
function calculateAccuracy() {
  const reviewedRecognitions = recognitions.filter((recognition) => {
    return recognition.status !== "unreviewed";
  });

  const correctRecognitions = reviewedRecognitions.filter((recognition) => {
    return recognition.status === "correct";
  });

  // Если проверенных карточек нет
  if (reviewedRecognitions.length === 0) {
    return 0;
  }

  return Math.round(
    (correctRecognitions.length / reviewedRecognitions.length) * 100
  );
}


// Показываем карточки на странице
function render(items) {
  // Превращаем каждый объект recognition в HTML-карточку
  const cards = items.map((recognition) => {
    const confidencePercent = Math.round(
      recognition.confidence * 100
    );

    return `
      <article
        class="${recognition.status}"
        data-id="${recognition.id}"
      >
        <h3>Результат ${recognition.id}</h3>

        <p>
          <code>${recognition.value}</code>
        </p>

        <p>
          Confidence:
          <strong>${confidencePercent}%</strong>
        </p>
      </article>
    `;
  });

  // Склеиваем массив HTML-строк в одну строку
  const cardsHtml = cards.join("");

  // Вставляем карточки на страницу
  resultsContainer.innerHTML = cardsHtml;

  // Обновляем accuracy
  const accuracy = calculateAccuracy();
  accuracyElement.textContent = `${accuracy}%`;
}


// Фильтруем данные по поиску и статусу
function updateResults() {
  const searchText = searchInput.value.toLowerCase();
  const selectedStatus = statusSelect.value;

  // Фильтр по тексту
  let filteredRecognitions = recognitions.filter(
    (recognition) => {
      return recognition.value
        .toLowerCase()
        .includes(searchText);
    }
  );

  // Фильтр по статусу
  if (selectedStatus !== "all") {
    filteredRecognitions =
      filteredRecognitions.filter(
        (recognition) => {
          return recognition.status === selectedStatus;
        }
      );
  }

  render(filteredRecognitions);
}


// Возвращаем следующий статус карточки
function getNextStatus(currentStatus) {
  if (currentStatus === "unreviewed") {
    return "correct";
  }

  if (currentStatus === "correct") {
    return "wrong";
  }

  return "unreviewed";
}


// Загружаем recognitions.json
async function loadRecognitions() {
  // Показываем состояние загрузки
  resultsContainer.innerHTML = "<p>Загрузка...</p>";
  refreshButton.disabled = true;

  try {
    // Отправляем запрос за JSON-файлом
    const response = await fetch("recognitions.json");

    // Проверяем HTTP-ошибки, например 404
    if (!response.ok) {
      throw new Error(
        `Ошибка HTTP: ${response.status}`
      );
    }

    // Превращаем JSON в JavaScript-массив
    recognitions = await response.json();

    // Показываем полученные данные
    updateResults();

  } catch (error) {
    // Показываем ошибку пользователю
    resultsContainer.innerHTML = `
      <p>Не удалось загрузить данные.</p>
      <p>${error.message}</p>
    `;

    accuracyElement.textContent = "—";

  } finally {
    // Включаем кнопку обратно
    refreshButton.disabled = false;
  }
}






// Загружаем данные при открытии страницы
loadRecognitions();