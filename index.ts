function multiply(a: number, b?: number): number {
  return a * (b ?? 1); // If b is not provided, use 1
}
function welcome(message: string = "Hello"): string {
  return `${message}, world!`;
}

function regularGreet(name: string): string {
  return `Hello, ${name}!`;
}

const arrowGreet = (name: string): string => `Hello, ${name}!`;
