// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// Use this for make code look pretty and formated
export {};

// Slide 66
// Copy
class PondDuck {
  name: string;
  age: number;
  type: string;
  color: string;
  isFlying: boolean; // Additional property not in the interface
  favoriteFood?: string; // Optional property

  constructor(name: string, age: number, type: string, color: string, favoriteFood?: string) {
    this.name = name;
    this.age = age;
    this.type = type;
    this.color = color;
    this.isFlying = false; // Ducks are not flying by default
    this.favoriteFood = favoriteFood; // Assign optional property if provided
  }

  quack(): void {
    console.log(`${this.name} duck says: Quack!`);
    // ToDo
    // Quack for a certain number of (optional) times
    // Expected Output: Daffy the Black Mallard duck says: Quack!
  }

  // Method to make the duck fly
  fly(): void {
    if (!this.isFlying) {
      this.isFlying = true;
      console.log(`${this.name} starts flying!`);
    }
    // ToDo
    // Warn if the duck is already flying
    // Expected Output: Daffy is already flying!
  }

  land(): void {
    // ToDo
    // Add land method
    // Expected Output: Daffy lands gracefully / Daffy is already on the ground.
  }
}

// Slide 76
// Type
// Enum for Duck Types
enum DuckType {
  Mallard = 'Mallard',
  Muscovy = 'Muscovy',
  Pekin = 'Pekin',
}

// Type for Duck Colors using Union Type
type DuckColor = 'White' | 'Brown' | 'Black' | 'Mixed';

// Slide 78

// Duck pond array to store multiple Duck objects
const duckPond: PondDuck[] = []; // Explicit typing

// Create some Duck instances and add them to the duck pond
const daffy = new PondDuck('Daffy', 3, DuckType.Mallard, 'Black'); // Inferred typing for the new Duck instance
const donald = new PondDuck('Donald', 5, DuckType.Pekin, 'White', 'Corn'); // Optional property provided
const howard = new PondDuck('Howard', 2, DuckType.Muscovy, 'Brown');

// Adding ducks to the pond array
duckPond.push(daffy, donald, howard);

// ToDo
// Write function to make given list of ducks quack
// Optional argument for the number of times
function makeAllDucksQuack(ducks: PondDuck[], times?: number): void {}

// ToDo
// Write function to make a specific duck in pond fly based on its name
// Warn if the duck is not found, Sample Output: No duck named Donald found in the pond.
function findDuckAndFly(name: string): void {}
