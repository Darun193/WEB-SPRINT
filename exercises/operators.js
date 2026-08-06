const confidence = 0.84;
const threshold = 0.9;

const isHighConfidence = confidence >= threshold;
const needsReview = confidence < threshold;

console.log(`Уверенность: ${confidence * 100}%`);
console.log(isHighConfidence);
console.log(needsReview);
console.log(confidence === threshold);
console.log(confidence !== threshold);