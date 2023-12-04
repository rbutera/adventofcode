var source = require("fs").readFileSync("input.txt", "utf8");

// 21 + 88 + 75 + 41 + 94 + 18 + 44 + 74 + 53 + 93 + 33 + 81 = 705
var training = `two934seven1
8825eightknfv
sevenoneqbfzntsix55
foursqpqvv192rdrbtcccfourone
9jpzhpxqthreelmrnlhfqmn4
onedpsckg3xdhmgtsixthreefivejlncszkxeight
4twofour
7eighttwo17fournsmrznntgjrdpkdjvx
573
ninethree3
3gngzkpkgrf
qeightwo2xjvfkfiveone`;

// basic version, part one
function calculate(current, input) {
  if (!input) {
    return current;
  }
  const [first, ...rest] = input.split("\n");

  // get numbers in a line
  const digits = first.match(/\d/g);
  const firstDigit = digits[0];
  const lastDigit = digits.at(-1);
  const combined = Number.parseInt(`${firstDigit}${lastDigit}`, 10);

  return calculate(current + combined, rest.join("\n"));
}

function wordToNumber(input) {
  const numbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  return numbers[input];
}

function isNumber(input) {
  return !isNaN(Number(input));
}

// Mapping words to corresponding numbers
const numberMapper = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

// Calculate the sum based on numeric values in each string
const calculateSum = (result, item) => {
  // Extract all matches (numeric digits or mapped words) using regex
  const matches = item
    .toLowerCase()
    .matchAll(/(?=((\d)|one|two|three|four|five|six|seven|eight|nine))/gm);

  // Array to store the matched values
  const hits = [];

  // Collect matched values in the hits array
  for (const match of matches) {
    hits.push(match[1]);
  }

  const firstDigit = hits[0];
  const lastDigit = hits[hits.length - 1];

  // If there are matched values, convert and add them to the result
  if (hits.length) {
    const converted = `${
      isNaN(parseInt(firstDigit)) ? numberMapper[firstDigit] : firstDigit
    }${isNaN(parseInt(lastDigit)) ? numberMapper[lastDigit] : lastDigit}`;
    return result + parseInt(converted);
  }

  // If no matched values found, return the current result
  return result;
};

function main() {
  // Calculate the sum using reduce and the calculateSum function
  const sum = source.trim().split(/\n/gm).reduce(calculateSum, 0);

  // Display the final sum
  console.log(sum);
}

main();
