interface Person {
  name: string;
  age?: number;
  isStudent: boolean;
}

class Athlete implements Person {
  name: string;
  age?: number;
  isStudent: boolean;
  sport: string;

  constructor(
    name: string,
    age: number,
    sport: string,
    isStudent: boolean = true
  ) {
    this.name = name;
    this.age = age;
    this.sport = sport;
    this.isStudent = isStudent;
  }

  greet(): string {
    return `Hello, my name is ${this.name} and I am ${
      this.age
    } years old. I am ${
      this.isStudent ? "a student" : "not a student"
    } and I play ${this.sport}.`;
  }
}

const person = new Athlete("John Doe", 30, "football");

console.log(person.greet());
