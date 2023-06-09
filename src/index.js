import { aArray, xArray } from './data.js';
import { buildMathExpectation, buildStandardDeviation, getDependenceOfLvl,
  getDependenceOfQuantity, getDependenceOfLvlX, getDependenceOfQuantityX,
  quantityOfNumbers, sampleMean, standardDeviation, sampleVariance,
  getDependenceOfLvlForGraph, getDependenceOfLvlXForGraph, getDependenceOfQuantityForGraph,
  getDependenceOfQuantityXForGraph } from './methods.js';
import { drawGraph } from './draw.js';

const mathExpectation = buildMathExpectation(sampleMean, standardDeviation, 0.95, quantityOfNumbers); // Математичне сподівання
const standardDeviationRange = buildStandardDeviation(quantityOfNumbers, sampleVariance, 0.95); // Середньоквадратичне відхилення
const dependenceOfLvl = getDependenceOfLvl(aArray); // Залежність оцінок μ від рівня довіри
const dependenceOfLvlX = getDependenceOfLvlX(aArray); // Залежність оцінок s від рівня довіри
const dependenceOfQuantity = getDependenceOfQuantity(xArray); // Залежність оцінок μ від обсягу вибірки
const dependenceOfQuantityX = getDependenceOfQuantityX(xArray); // Залежність оцінок s від обсягу вибірки
const dependenceOfLvlForGraph = getDependenceOfLvlForGraph(aArray); // Будування графіку для dependenceOfLvl
const dependenceOfLvlXForGraph = getDependenceOfLvlXForGraph(aArray); // Будування графіку для dependenceOfLvlX
const dependenceOfQuantityForGraph = getDependenceOfQuantityForGraph(xArray); // Будування графіку для dependenceOfQuantity
const dependenceOfQuantityXForGraph = getDependenceOfQuantityXForGraph(xArray); // Будування графіку для dependenceOfQuantityX

const arrayLengths = xArray.map(x => x.length);

console.log(`Середньоквадратичне відхилення σ: ${standardDeviationRange}\n`);
console.log(`Математичне сподівання μ: ${mathExpectation}\n`);
console.log(`Залежність оцінок μ від рівня довіри: ${dependenceOfLvl}\n`);
drawGraph(aArray, dependenceOfLvlForGraph);
console.log(`Залежність оцінок μ від обсягу вибірки: ${dependenceOfQuantity}\n`);
drawGraph(arrayLengths, dependenceOfQuantityForGraph);
console.log(`Залежність оцінок σ від рівня довіри: ${dependenceOfLvlX}\n`);
drawGraph(aArray, dependenceOfLvlXForGraph);
console.log(`Залежність оцінок σ від обсягу вибірки: ${dependenceOfQuantityX}\n`);
drawGraph(arrayLengths, dependenceOfQuantityXForGraph);
