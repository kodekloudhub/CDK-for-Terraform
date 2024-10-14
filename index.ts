// Enum for Duck Types
enum DuckType {
  Mallard = "Mallard",
  Muscovy = "Muscovy",
  Pekin = "Pekin",
}

// Type for Duck Colors using Union Type
type DuckColor = "White" | "Brown" | "Black" | "Mixed";

// Interface for a Duck's properties
interface IDuck {
  name: string; // Name of the duck
  age: number; // Age of the duck in years
  type: DuckType; // Type of duck, using the DuckType enum
  color: DuckColor; // Color of the duck, using the DuckColor union type
  favoriteToy?: string; // Optional property: favorite toy of the duck
}

// HappyDuck class that implements the Duck interface
class PondDuck implements IDuck {
  name: string;
  age: number;
  type: DuckType;
  color: DuckColor;
  isFlying: boolean; // Additional property not in the interface
  favoriteFood?: string; // Optional property

  constructor(
    name: string,
    age: number,
    type: DuckType,
    color: DuckColor,
    favoriteFood?: string,
  ) {
    this.name = name;
    this.age = age;
    this.type = type;
    this.color = color;
    this.isFlying = false; // Ducks are not flying by default
    this.favoriteFood = favoriteFood; // Assign optional property if provided
  }

  // Method to make the duck quack a certain number of times
  quack(times?: number): void {
    // Optional function argument
    const quackCount = times ?? 1; // Default to 1 if no argument is provided
    for (let i = 0; i < quackCount; i++) {
      console.log(
        `${this.name} the ${this.color} ${this.type} duck says: Quack!`,
      );
    }
  }

  // Method to make the duck fly
  fly(): void {
    if (!this.isFlying) {
      this.isFlying = true;
      console.log(`${this.name} starts flying!`);
    } else {
      console.log(`${this.name} is already flying.`);
    }
  }

  // Method to make the duck land
  land(): void {
    if (this.isFlying) {
      this.isFlying = false;
      console.log(`${this.name} lands gracefully.`);
    } else {
      console.log(`${this.name} is already on the ground.`);
    }
  }
}

// Define an object for the developer, Elmer Code, using a Type
type Developer = {
  name: string;
  favoriteDuckType: DuckType;
  skills: string[];
};

// Create an instance of Elmer Code
const elmer: Developer = {
  name: "Elmer Code",
  favoriteDuckType: DuckType.Mallard,
  skills: ["TypeScript", "Debugging", "Problem Solving", "Hunting Ducks!"],
};

// Example Usage:
console.log(
  `Developer ${elmer.name} is obsessed with ${elmer.favoriteDuckType} ducks!`,
);

// Duck pond array to store multiple Duck objects
const duckPond: PondDuck[] = []; // Explicit typing

// Create some Duck instances and add them to the duck pond
const daffy = new PondDuck("Daffy", 3, DuckType.Mallard, "Black"); // Inferred typing for the new Duck instance
const donald = new PondDuck("Donald", 5, DuckType.Pekin, "White", "Corn"); // Optional property provided
const howard = new PondDuck("Howard", 2, DuckType.Muscovy, "Brown");

// Adding ducks to the pond array
duckPond.push(daffy, donald, howard);

// Function to make all ducks in the pond quack
function makeAllDucksQuack(ducks: PondDuck[], times?: number): void {
  // Optional argument for the number of times
  ducks.forEach((duck) => duck.quack(times));
}

// Function to make a specific duck fly based on its name
function findDuckAndFly(name: string): void {
  const foundDuck = duckPond.find((duck) => duck.name === name);
  if (foundDuck) {
    foundDuck.fly();
  } else {
    console.log(`No duck named ${name} found in the pond.`);
  }
}

// Function to count the ducks by type using explicit typing
function countDucksByType(type: DuckType): number {
  return duckPond.filter((duck) => duck.type === type).length;
}

// Make all ducks in the pond quack 3 times
makeAllDucksQuack(duckPond, 3);

// Make a specific duck fly
findDuckAndFly("Donald"); // Output: "Donald starts flying!"

// Count the ducks by type
const mallardCount: number = countDucksByType(DuckType.Mallard);
console.log(`There are ${mallardCount} Mallard ducks in the pond.`);

// List all ducks currently in the pond
console.log("Ducks in the pond:", duckPond.map((duck) => duck.name).join(", "));
