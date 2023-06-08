const drawGraph = (xValues, yValues) => {
  // Визначення мінімальних і максимальних значень по осях
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  // Масштабування значень по осях
  const width = 80;
  const height = 25;

  // Масштабирование значений по осям
  const scaleX = width / (maxX - minX);
  const scaleY = height / (maxY - minY);

  // Створення двовимірного масиву для представлення координатної площини
  const plot = new Array(height);
  for (let i = 0; i < height; i++) {
    plot[i] = new Array(width).fill(' ');
  }

  // Побудова точок на координатній площині
  const numPoints = xValues.length;
  for (let i = 0; i < numPoints; i++) {
    const x = Math.round((xValues[i] - minX) * scaleX);
    const y = Math.round((yValues[i] - minY) * scaleY);

    // Встановлення точки на графіку
    if (plot[height - 1 - y]) {
      plot[height - 1 - y][x] = '•';
    }
  }

  // Соединение точек линиями
  for (let i = 0; i < numPoints - 1; i++) {
    const x1 = Math.round((xValues[i] - minX) * scaleX);
    const y1 = Math.round((yValues[i] - minY) * scaleY);
    const x2 = Math.round((xValues[i + 1] - minX) * scaleX);
    const y2 = Math.round((yValues[i + 1] - minY) * scaleY);

    drawLine(plot, x1, height - 1 - y1, x2, height - 1 - y2);
  }

  // Малювання графіка в консолі
  for (let row of plot) {
    console.log(row.join(''));
  }

  // Надписи значений на осях
  console.log(`\nX: ${minX} to ${maxX}`);
  console.log(`Y: ${minY} to ${maxY}`);
}

// Функція для малювання лінії між двома точками на координатній площині
function drawLine(plot, x1, y1, x2, y2) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    if (plot[y1] && plot[y1][x1]) {
      plot[y1][x1] = '•';
    }

    if (x1 === x2 && y1 === y2) {
      break;
    }

    const err2 = 2 * err;
    if (err2 > -dy) {
      err -= dy;
      x1 += sx;
    }
    if (err2 < dx) {
      err += dx;
      y1 += sy;
    }
  }
};

export { drawGraph };
