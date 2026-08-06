const recognitions = [
  {
    id: 1,
    value: "MSKU 907032 1",
    confidence: 0.97,
    status: "correct",
  },
  {
    id: 2,
    value: "AB1234",
    confidence: 0.84,
    status: "unreviewed",
  },
  {
    id: 3,
    value: "CD5678",
    confidence: 0.91,
    status: "wrong",
  },
  {
    id: 4,
    value: "EF9012",
    confidence: 0.71,
    status: "correct",
  },
  {
    id: 5,
    value: "XYZ2048",
    confidence: 0.88,
    status: "unreviewed",
  },
  {
    id: 6,
    value: "QR7788",
    confidence: 0.95,
    status: "correct",
  },
];

console.log(recognitions);

const lowConfidenceRecognitions = recognitions.filter((recognition) => {
  return recognition.confidence < 0.9;
});

console.log(lowConfidenceRecognitions);

const recognitionLabels = recognitions.map((recognition) => {
  const confidencePercent = Math.round(recognition.confidence * 100);

  return `${recognition.value} (${confidencePercent}%)`;
});

console.log(recognitionLabels);

const statusCounts = recognitions.reduce((counts, recognition) => {
  counts[recognition.status] = (counts[recognition.status] || 0) + 1;

  return counts;
}, {});

console.log(statusCounts);

function calculateAverageConfidence(items) {
  const total = items.reduce((sum, recognition) => {
    return sum + recognition.confidence;
  }, 0);

  return total / items.length;
}

const averageConfidence = calculateAverageConfidence(recognitions);

console.log("Среднее:", averageConfidence);

function calculateMedianConfidence(items) {
  const confidenceValues = items.map((recognition) => {
    return recognition.confidence;
  });

  const sortedValues = confidenceValues
    .slice()
    .sort((a, b) => a - b);

  const middleIndex = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 0) {
    const leftMiddle = sortedValues[middleIndex - 1];
    const rightMiddle = sortedValues[middleIndex];

    return (leftMiddle + rightMiddle) / 2;
  }

  return sortedValues[middleIndex];
}

const medianConfidence =
  calculateMedianConfidence(recognitions);

console.log("Медиана:", medianConfidence);

function calculateStandardDeviation(items) {
  const average = calculateAverageConfidence(items);

  const variance = items.reduce((sum, recognition) => {
    const difference = recognition.confidence - average;
    const squaredDifference = difference ** 2;

    return sum + squaredDifference;
  }, 0) / items.length;

  return Math.sqrt(variance);
}

const standardDeviation =
  calculateStandardDeviation(recognitions);

console.log("Стандартное отклонение:", standardDeviation);

const sortedRecognitions = [...recognitions].sort((a, b) => {
  return b.confidence - a.confidence;
});

console.log("Отсортированный массив:");
console.log(sortedRecognitions);

console.log("Исходный массив:");
console.log(recognitions);