type Status = "correct" | "wrong" | "unreviewed";

interface Recognition {
  id: number;
  value: string;
  confidence: number;
  status: Status;
}


// Получаем элементы со страницы
function getRequiredElement<T extends Element>(
  selector: string
): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Не найден элемент: ${selector}`);
  }

  return element;
}

const resultsContainer =
  getRequiredElement<HTMLDivElement>("#results-container");

const searchInput =
  getRequiredElement<HTMLInputElement>("#search-input");

const statusSelect =
  getRequiredElement<HTMLSelectElement>("#status-filter");

const accuracyElement =
  getRequiredElement<HTMLElement>("#accuracy");


// Здесь будут храниться данные из recognitions.json
let recognitions: Recognition[] = [];


// Создаём кнопку обновления данных
const refreshButton = document.createElement("button");

refreshButton.textContent = "Обновить данные";

resultsContainer.before(refreshButton);


// Повторно загружаем данные по кнопке
refreshButton.addEventListener("click", () => {
  void loadRecognitions();
});


// Обрабатываем клик по карточке
resultsContainer.addEventListener("click", (event) => {
  const target = event.target;

  // event.target не обязательно является HTML-элементом
  if (!(target instanceof Element)) {
    return;
  }

  // Ищем карточку, по которой кликнули
  const card = target.closest<HTMLElement>(
    "article[data-id]"
  );

  if (!card) {
    return;
  }

  const id = card.dataset.id;

  if (!id) {
    return;
  }

  // Получаем id карточки
  const recognitionId = Number(id);

  if (Number.isNaN(recognitionId)) {
    return;
  }

  // Ищем объект с таким id в массиве
  const recognition = recognitions.find((item) => {
    return item.id === recognitionId;
  });

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


// Проверяем, является ли значение допустимым статусом
function isStatus(value: unknown): value is Status {
  return (
    value === "correct" ||
    value === "wrong" ||
    value === "unreviewed"
  );
}


// Проверяем один объект Recognition
function isRecognition(value: unknown): value is Recognition {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "number" &&
    typeof item.value === "string" &&
    typeof item.confidence === "number" &&
    isStatus(item.status)
  );
}


// Проверяем массив объектов Recognition
function isRecognitionArray(
  value: unknown
): value is Recognition[] {
  return Array.isArray(value) && value.every(isRecognition);
}


// Считаем процент правильных среди проверенных карточек
function calculateAccuracy(): number {
  const reviewedRecognitions = recognitions.filter(
    (recognition) => {
      return recognition.status !== "unreviewed";
    }
  );

  const correctRecognitions = reviewedRecognitions.filter(
    (recognition) => {
      return recognition.status === "correct";
    }
  );

  if (reviewedRecognitions.length === 0) {
    return 0;
  }

  return Math.round(
    (correctRecognitions.length /
      reviewedRecognitions.length) *
    100
  );
}


// Показываем карточки на странице
function render(items: Recognition[]): void {
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

  const cardsHtml = cards.join("");

  resultsContainer.innerHTML = cardsHtml;

  const accuracy = calculateAccuracy();

  accuracyElement.textContent = `${accuracy}%`;
}


// Фильтруем данные по поиску и статусу
function updateResults(): void {
  const searchText = searchInput.value
    .trim()
    .toLowerCase();

  const selectedStatus = statusSelect.value;

  let filteredRecognitions = recognitions.filter(
    (recognition) => {
      return recognition.value
        .toLowerCase()
        .includes(searchText);
    }
  );

  // Если выбран конкретный допустимый статус
  if (isStatus(selectedStatus)) {
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
function getNextStatus(
  currentStatus: Status
): Status {
  if (currentStatus === "unreviewed") {
    return "correct";
  }

  if (currentStatus === "correct") {
    return "wrong";
  }

  return "unreviewed";
}


// Загружаем recognitions.json
async function loadRecognitions(): Promise<void> {
  resultsContainer.innerHTML = "<p>Загрузка...</p>";

  refreshButton.disabled = true;

  try {
    const response = await fetch("/recognitions.json");

    if (!response.ok) {
      throw new Error(
        `Ошибка HTTP: ${response.status}`
      );
    }

    // Данные извне сначала считаем неизвестными
    const data: unknown = await response.json();

    // Проверяем их перед использованием
    if (!isRecognitionArray(data)) {
      throw new Error(
        "Некорректный формат recognitions.json"
      );
    }

    recognitions = data;

    updateResults();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Неизвестная ошибка";

    resultsContainer.innerHTML = `
      <p>Не удалось загрузить данные.</p>
      <p>${errorMessage}</p>
    `;

    accuracyElement.textContent = "—";
  } finally {
    refreshButton.disabled = false;
  }
}


// Загружаем данные при открытии страницы
void loadRecognitions();