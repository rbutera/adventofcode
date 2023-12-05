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

function toPartNumber(x, y, grid) {
  const row = grid[y];
  const value = row[x];

  if (!value.match(/\d/)) {
    return 0;
  }

  const hasRowBelow = y !== grid.length - 1;
  const hasRowAbove = y !== 0;
  const previousRow = hasRowAbove && grid[y - 1];
  const nextRow = hasRowBelow && grid[y + 1];

  const xMax = row.length - 1;

  // part is a number, check for adjacent

  const searchLeftAndRight = (inputRow, inputX) => {
    // check left and right
    if (inputX != 0) {
      // check left
      if (isSymbol(row[inputX - 1])) {
        return value;
      }
    }

    if (inputX <= xMax) {
      // check right
      if (isSymbol(row[inputX + 1])) {
        return value;
      }
    }
    return false;
  };

  if (hasRowAbove) {
    // check up
    // check up-left
    if (x <= xMax) {
      // check up-right
    }
  }

  if (hasRowBelow) {
    // check down
    // check down-left
    if (x <= xMax) {
      // check down-right
    }
  }
}

function main() {}

main();
