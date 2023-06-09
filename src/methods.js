import jStat from 'jstat';
import { x } from './data.js';

//Отримання суми значеннь у вибірці
const getSumOfNumbers = (array) =>{
  return array.reduce((a, b) => a + b);
};

//Отримання обсягу вибірки
const getQuantityOfNumbers = (array) => {
  return array.length;
};

// Обчислення вибіркової дисперсії
const getSampleVariance = (array, quantity, sampleMean) => {
  const additional = array.reduce((a, b) => a + (b - sampleMean) ** 2, 0);
  return additional / (quantity - 1);
};

// Обчислення 95% двосторонні довірчі інтервали на математичне
//сподівання
const buildMathExpectation = (x, s, alpha, n) => {
  const t = -jStat.studentt.inv((1 - alpha) / 2, n - 1);
  const additive = t * s / Math.sqrt(n);

  return `${x - additive} ≤ μ ≤ ${x + additive}`;
};

const buildMathExpectationForGraph = (s, alpha, n) => {
  const t = -jStat.studentt.inv((1 - alpha) / 2, n - 1);
  const additive = t * s / Math.sqrt(n);

  return additive * 2;
};

// Обчислення 95% двосторонні довірчі інтервали на середньоквадратичне відхилення
const buildStandardDeviation = (n, s, t) => {
  const χ1 = jStat.chisquare.inv(t / 2, 147);
  const χ2 = jStat.chisquare.inv(1 - t / 2, 147);
  return `${Math.sqrt((n - 1) * s / χ1)} ≥ σ ≥ ${Math.sqrt((n - 1) * s / χ2)}`;
};

const buildStandardDeviationForGraph = (n, s, t) => {
  const χ1 = jStat.chisquare.inv(t / 2, 147);
  const χ2 = jStat.chisquare.inv(1 - t / 2, 147);

  return Math.sqrt((n - 1) * s) * (1 / χ1 - 1 / χ2);
};

// Дослідження залежності оцінок від рівня довіри
const getDependenceOfLvl = (t) => t.map(t => `\n${t}: ${buildMathExpectation(sampleMean, standardDeviation, t, quantityOfNumbers)}`);
const getDependenceOfLvlX = (t) => t.map(t => `\n${t}: ${buildStandardDeviation(quantityOfNumbers, sampleVariance, t)}`);

// Отримання значення інтервалів від рівня довіри
const getDependenceOfLvlForGraph = (t) => t.map(t => buildMathExpectationForGraph(standardDeviation, t, quantityOfNumbers));
const getDependenceOfLvlXForGraph = (t) => t.map(t => buildStandardDeviationForGraph(quantityOfNumbers, sampleVariance, t));

// Дослідження залежності оцінок від обсягу вибірки
const getDependenceOfQuantity = (array) => {
  return array.map(x => {
    const sumOfNumbers = getSumOfNumbers(x);
    const quantityOfNumbers = getQuantityOfNumbers(x);
    const sampleMean = sumOfNumbers / quantityOfNumbers;
    const sampleVariance = getSampleVariance(x, quantityOfNumbers, sampleMean);
    const standardDeviation = Math.sqrt(sampleVariance);

    return `\n${x.length}: ${buildMathExpectation(sampleMean, standardDeviation, 0.95, quantityOfNumbers)}`;
  });
};

const getDependenceOfQuantityX = (array) => {
  return array.map(x => {
    const sumOfNumbers = getSumOfNumbers(x);
    const quantityOfNumbers = getQuantityOfNumbers(x);
    const sampleMean = sumOfNumbers / quantityOfNumbers;
    const sampleVariance = getSampleVariance(x, quantityOfNumbers, sampleMean);

    return `\n${x.length}: ${buildStandardDeviation(quantityOfNumbers, sampleVariance, 0.95)}`;
  })
};

// Отримання значення інтервалів від обсягу вибірки
const getDependenceOfQuantityForGraph = (array) => {
  return array.map(x => {
    const sumOfNumbers = getSumOfNumbers(x);
    const quantityOfNumbers = getQuantityOfNumbers(x);
    const sampleMean = sumOfNumbers / quantityOfNumbers;
    const sampleVariance = getSampleVariance(x, quantityOfNumbers, sampleMean);
    const standardDeviation = Math.sqrt(sampleVariance);

    return buildMathExpectationForGraph(standardDeviation, 0.95, quantityOfNumbers);
  });
};

const getDependenceOfQuantityXForGraph = (array) => {
  return array.map(x => {
    const sumOfNumbers = getSumOfNumbers(x);
    const quantityOfNumbers = getQuantityOfNumbers(x);
    const sampleMean = sumOfNumbers / quantityOfNumbers;
    const sampleVariance = getSampleVariance(x, quantityOfNumbers, sampleMean);

    return buildStandardDeviationForGraph(quantityOfNumbers, sampleVariance, 0.95);
  })
};

const sumOfNumbers = getSumOfNumbers(x); // Сума всіх чисел
const quantityOfNumbers = getQuantityOfNumbers(x); // Обсяг вибірки
const sampleMean = sumOfNumbers / quantityOfNumbers; // x¯
const sampleVariance = getSampleVariance(x, quantityOfNumbers, sampleMean); // s^2
const standardDeviation = Math.sqrt(sampleVariance); // Обчислення середньоквадратичне відхилення === корінь від вибіркової дисперсії

export { getSampleVariance, buildMathExpectation, buildStandardDeviation, getDependenceOfLvl, getDependenceOfQuantity, getDependenceOfLvlX, getDependenceOfQuantityX, quantityOfNumbers, sampleMean, standardDeviation, sampleVariance, getDependenceOfLvlForGraph, getDependenceOfLvlXForGraph, getDependenceOfQuantityForGraph, getDependenceOfQuantityXForGraph };