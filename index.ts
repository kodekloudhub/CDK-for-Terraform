type Fruit = "APPLE" | "BANANA" | "ORANGE";
let myFruit: Fruit;
myFruit = "APPLE"; // Valid
myFruit = "BANANA"; // Valid
// myFruit = "GRAPE"; // Error: "GRAPE" is not a valid value

enum Status {
  PENDING = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
}

let myStatus: Status;
myStatus = Status.PENDING; // Valid, assigns value 1
myStatus = Status.IN_PROGRESS; // Valid, assigns value 2

enum Color {
  RED = "RED",
  GREEN = "GREEN",
  BLUE = "BLUE",
}

let myColor: Color;
myColor = Color.RED; // Valid, assigns value "RED"
myColor = Color.GREEN; // Valid, assigns value "GREEN"
