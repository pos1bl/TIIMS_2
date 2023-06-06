const x = [24, 27, 28, 26, 24, 25, 24, 23, 22, 28, 28, 24, 24, 22, 24, 26, 28, 25, 23, 24, 22, 25, 26, 25, 26, 25, 24,
  24, 25, 21, 26, 28, 22, 26, 23, 24, 24, 23, 25, 27, 25, 22, 29, 25, 27, 24, 24, 23, 27, 25, 28, 25, 24, 27, 24, 28,
  26, 26, 25, 26, 23, 26, 25, 25, 27, 26, 23, 28, 26, 28, 26, 25, 23, 23, 26, 25, 25, 26, 27, 24, 28, 25, 25, 24, 25,
  25, 28, 22, 24, 25, 28, 27, 30, 24, 22, 27, 25, 25, 25, 27, 27, 24, 23, 26, 21, 23, 24, 28, 23, 22, 22, 24, 28, 27,
  26, 24, 23, 25, 25, 26, 24, 26, 27, 24, 26, 24, 24, 26, 23, 26, 28, 25, 25, 25, 28, 26, 29, 25, 26, 25, 25, 26, 25,
  26, 25, 26, 22, 26];
const x2 = x.slice(0, Math.floor(x.length / 2));
const x3 = x.slice(0, Math.floor(x2.length / 2));
const x4 = x.slice(0, Math.floor(x3.length / 2));
const x5 = x.slice(0, Math.floor(x4.length / 2));
const x6 = x.slice(0, Math.floor(x5.length / 2));
const x7 = x.slice(0, Math.floor(x6.length / 2));
const x8 = x.slice(0, Math.floor(x7.length / 2));

const t = 1.980;
const tArray = [0.254, 0.677, 1.289, 1.658, 1.98, 2.2358, 2.617, 2.860, 3.160, 3.373];
const dependenceArray = ['20%', '50%', '80%', '90%', '95%', '98%', '99%', '99.5%', '99.8%', '99.9%'];
const xArray = [x, x2, x3, x4, x5, x6, x7, x8]
const tArray2 = [1.98, 2, 2.021, 2.101, 2.262, 2.776, 4.303, 12.706];

const getSumOfNumbers = (array) =>{
  return array.reduce((a, b) => a + b);
};

const getQuantityOfNumbers = (array) => {
  return array.length;
};

const sortArray = (array) => {
  const sorted = {};
  for (const number of array) {
    if (!sorted.hasOwnProperty(number)) {
      sorted[number] = 1;
    } else {
      sorted[number]++;
    }
  }

  return sorted;
};

const standardDeviationSum = (object) => {
  return Object
    .entries(object)
    .map(([number, quantity]) => Number(number) ** 2 * quantity)
    .reduce((a, b) => a + b);
}

const getSampleVariance = (object, quantity, sampleMean) => {
  return 1 / (quantity - 1) * standardDeviationSum(object) - sampleMean ** 2;
};

const getMathExpectation = (x, s, t, n) => {
  const additive = t * s / Math.sqrt(n);

  return `${x - additive} ≤ μ ≤ ${x + additive}`;
}

const getDependenceOfLvl = (t, dependence) => t.map((t, i) => `\n${dependence[i]}: ${getMathExpectation(sampleMean, standardDeviation, t, quantityOfNumbers)}`);

const getDependenceOfQuantity = (array, tArray) => {
  return array.map((x, i) => {
    const sumOfNumbers = getSumOfNumbers(x);
    const quantityOfNumbers = getQuantityOfNumbers(x);
    const sampleMean = sumOfNumbers / quantityOfNumbers;
    const sortedData = sortArray(x);
    const sampleVariance = getSampleVariance(sortedData, quantityOfNumbers, sampleMean);
    const standardDeviation = Math.sqrt(sampleVariance);
    return `\n${x.length}: ${getMathExpectation(sampleMean, standardDeviation, tArray[i], quantityOfNumbers)}`;
  });
};

const sumOfNumbers = getSumOfNumbers(x);
const quantityOfNumbers = getQuantityOfNumbers(x);
const sampleMean = sumOfNumbers / quantityOfNumbers;
const sortedData = sortArray(x);
const sampleVariance = getSampleVariance(sortedData, quantityOfNumbers, sampleMean);
const standardDeviation = Math.sqrt(sampleVariance);
const mathExpectation = getMathExpectation(sampleMean, standardDeviation, t, quantityOfNumbers);
const dependenceOfLvl = getDependenceOfLvl(tArray, dependenceArray);
const dependenceOfQuantity = getDependenceOfQuantity(xArray, tArray2);

console.log(`Середньоквадратичне відхилення s: ${standardDeviation}\n`);
console.log(`Математичне сподівання μ: ${mathExpectation}\n`);
console.log(`Залежність оцінок від рівня довіри: ${dependenceOfLvl}\n`);
console.log(`Залежність оцінок від обсягу вибірки: ${dependenceOfQuantity}`);