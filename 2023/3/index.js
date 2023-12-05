const sources = {
  training: require("fs").readFileSync("training.txt", "utf8"),
  real: require("fs").readFileSync("input.txt", "utf8"),
};

const symbolPattern = /[\*|=|\-|%|\^|@|\$|\/|\+|#|\&]/;

const isSymbol = (x) => !!x.match(symbolPattern);

for (const x of ["*", "=", "-", "%", "&", "@", "$", "/", "+", "#"]) {
  if (!isSymbol(x)) {
    throw new Error(`isSymbol(${x}) => ${isSymbol(x)}`);
  }
}

function toGrid(input) {
  const trimmed = input.trim();
  return input.split("\n").map((x) => x.split(""));
}

function getRowAndValue(x, y, grid) {
  const row = grid[y];
  const value = row[x];
  const hasRowBelow = y !== grid.length - 1;
  const hasRowAbove = y !== 0;
  const previous = hasRowAbove && grid[y - 1];
  const next = hasRowBelow && grid[y + 1];

  return { row, value, previous, next };
}

function getCurrentNumber(x, y, grid) {
  const { row, value } = getRowAndValue(x, y, grid);

  let buffer = [value];

  const shouldSearchLeft = x > 0;
  const shouldSearchRight = x < row.length - 1;

  const boundaries = {
    start: 0,
    end: row.length - 1,
  };

  if (shouldSearchLeft) {
    let cursor = x - 1;
    while (cursor >= 0) {
      let current = row[cursor];
      if (/\d/.test(current)) {
        buffer.unshift(current);
        boundaries.start = cursor;
      } else {
        break;
      }
      cursor--;
    }
  }

  if (shouldSearchRight) {
    let cursor = x + 1;
    while (cursor < row.length) {
      let current = row[cursor];
      if (/\d/.test(current)) {
        buffer.push(current);
        boundaries.end = cursor;
      } else {
        break;
      }
      cursor++;
    }
  }

  return {
    part: Number.parseInt(buffer.join(""), 10),
    y,
    boundaries,
  };
}

const searchLeftAndRight = (inputRow, inputX, previous, next) => {
  // check left and right
  if (inputX != 0) {
    // check left
    if (isSymbol(inputRow[inputX - 1])) {
      return true;
    }
  }

  if (inputX < inputRow.length - 1) {
    // check right
    if (isSymbol(inputRow[inputX + 1])) {
      return true;
    }
  }
  return false;
};

const searchUpAndDown = (inputRow, inputX, previous, next) => {
  if (previous) {
    // check up
    if (isSymbol(previous[inputX])) {
      return true;
    }
    // check up-left
    if (inputX > 0) {
      if (isSymbol(previous[inputX - 1])) {
        return true;
      }
    }
    if (inputX < inputRow.length - 1) {
      if (isSymbol(previous[inputX + 1])) {
        return true;
      }
    }
  }

  if (next) {
    // check down p
    if (isSymbol(next[inputX])) {
      return true;
    }

    // check down-left
    if (inputX > 0) {
      if (isSymbol(next[inputX - 1])) {
        return true;
      }
    }

    // check down-right
    if (inputX < inputRow.length - 1) {
      if (isSymbol(next[inputX + 1])) {
        return true;
      }
    }
  }

  return false;
};

function toPartNumber(x, y, grid) {
  const { row, value, previous, next } = getRowAndValue(x, y, grid);

  if (!value.match(/\d/)) {
    return 0;
  }

  const xMax = row.length - 1;

  // get current number and bounds
  const { part, boundaries } = getCurrentNumber(x, y, grid);
  console.log(
    `(${x}, ${y}) => current number is ${part}. it starts at x = ${boundaries.start} and ends at x = ${boundaries.end}`
  );

  let found = false;
  let cursor = boundaries.start;

  while (!found && cursor <= xMax) {
    found = searchLeftAndRight || searchUpAndDown;
    if (found && DEBUG_LOG) {
      console.log(`found a symbol!`);
      return {
        part,
        boundaries,
      };
    }
  }
}

function main() {
  console.log(toPartNumber(2, 3, toGrid(sources.training)));
}

main();
