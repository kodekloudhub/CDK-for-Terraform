// Importing named exports
import { add, subtract } from "./import-examples/mathUtils";

// Importing the default export
import calculateTotal from "./import-examples/calculator";

// Importing all exports from a file
import * as mathUtils from "./import-examples/utils";

// Using the imports
const sum = add(5, 10);
const difference = subtract(10, 5);
const total = calculateTotal([10, 20, 30]);
const product = mathUtils.multiply(5, 3);
const quotient = mathUtils.divide(10, 2);

console.log(`Sum: ${sum}`);
console.log(`Difference: ${difference}`);
console.log(`Total: ${total}`);
console.log(`Product: ${product}`);
console.log(`Quotient: ${quotient}`);
