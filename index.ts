interface Person {
  name: string;
  age?: number;
  isStudent: boolean;
}

const person1: Person = {
  name: "John Doe",
  age: 30,
  isStudent: false,
};

const person2: Person = {
  name: "Jane Doe",
  isStudent: true,
};

console.log(person1);
console.log(person2);
