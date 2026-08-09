import { recognitions } from "./data.js";

const resultsContainer = document.querySelector("#results-container");
const searchInput = document.querySelector("#search-input");
const statusSelect = document.querySelector("#status-filter");
const accuracyElement = document.querySelector("#accuracy");


function calculateAccuracy() {
  const reviewedRecognitions = recognitions.filter((recognition) => {
    return recognition.status !== "unreviewed";
  });

  const correctRecognitions = reviewedRecognitions.filter((recognition) => {
    return recognition.status === "correct";
  });

  if (reviewedRecognitions.length === 0) {
    return 0;
  }

  return Math.round(
    (correctRecognitions.length / reviewedRecognitions.length) * 100
  );
}


function render(items) {
  const cards = items.map((recognition) => {
    const confidencePercent = Math.round(recognition.confidence * 100);

    return `
      <article
        class="${recognition.status}"
        data-id="${recognition.id}"
      >
        <h3>Результат ${recognition.id}</h3>
        <p><code>${recognition.value}</code></p>
        <p>Confidence: <strong>${confidencePercent}%</strong></p>
      </article>
    `;
  });

  const cardsHtml = cards.join("");

  resultsContainer.innerHTML = cardsHtml;

  const accuracy = calculateAccuracy();
  accuracyElement.textContent = `${accuracy}%`;
}


function updateResults() {
  const searchText = searchInput.value.toLowerCase();
  const selectedStatus = statusSelect.value;

  let filteredRecognitions = recognitions.filter((recognition) => {
    return recognition.value.toLowerCase().includes(searchText);
  });

  if (selectedStatus !== "all") {
    filteredRecognitions = filteredRecognitions.filter((recognition) => {
      return recognition.status === selectedStatus;
    });
  }

  render(filteredRecognitions);
}


function getNextStatus(currentStatus) {
  if (currentStatus === "unreviewed") {
    return "correct";
  }

  if (currentStatus === "correct") {
    return "wrong";
  }

  return "unreviewed";
}


searchInput.addEventListener("input", () => {
  updateResults();
});


statusSelect.addEventListener("change", () => {
  updateResults();
});


resultsContainer.addEventListener("click", (event) => {
  const card = event.target.closest("article[data-id]");

  if (!card) {
    return;
  }

  const recognitionId = Number(card.dataset.id);

  const recognition = recognitions.find((item) => {
    return item.id === recognitionId;
  });

  if (!recognition) {
    return;
  }

  recognition.status = getNextStatus(recognition.status);

  updateResults();
});


render(recognitions);