import { aArray, xArray } from './data.js';
import { buildMathExpectation, buildStandardDeviation, getDependenceOfLvl, getDependenceOfQuantity, getDependenceOfLvlX, getDependenceOfQuantityX, quantityOfNumbers, sampleMean, standardDeviation, sampleVariance } from './methods.js';

const mathExpectation = buildMathExpectation(sampleMean, standardDeviation, 0.95, quantityOfNumbers); // Математичне сподівання
const standardDeviationRange = buildStandardDeviation(quantityOfNumbers, sampleVariance, 0.95); // Середньоквадратичне відхилення
const dependenceOfLvl = getDependenceOfLvl(aArray); // Залежність оцінок μ від рівня довіри
const dependenceOfLvlX = getDependenceOfLvlX(aArray); // Залежність оцінок s від рівня довіри
const dependenceOfQuantity = getDependenceOfQuantity(xArray); // Залежність оцінок μ від обсягу вибірки
const dependenceOfQuantityX = getDependenceOfQuantityX(xArray); // Залежність оцінок s від обсягу вибірки


console.log(`Середньоквадратичне відхилення s: ${standardDeviationRange}\n`);
console.log(`Математичне сподівання μ: ${mathExpectation}\n`);
console.log(`Залежність оцінок μ від рівня довіри: ${dependenceOfLvl}\n`);
console.log(`Залежність оцінок μ від обсягу вибірки: ${dependenceOfQuantity}\n`);
console.log(`Залежність оцінок s від рівня довіри: ${dependenceOfLvlX}\n`);
console.log(`Залежність оцінок s від обсягу вибірки: ${dependenceOfQuantityX}\n`);
