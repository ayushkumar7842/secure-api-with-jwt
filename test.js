class Car {
  constructor(name, color, price) {
    this.name = name;
    this.color = color;
    this.price = price;
  }

  getPrice() {
    return this.price;
  }
}

// inherit the properties of Car
class SuperCar extends Car {
  constructor(name, color, price, feature) {
    super(name, color, price); // Call the parent constructor
    this.feature = feature;
  }

  getFeature() {
    return this.feature;
  }
}

// Provide all required arguments for SuperCar
const s1 = new SuperCar("Ferrari", "Red", 300000, "Turbo Boost");
console.log(s1);
// console.log(s1.getFeature()); // Output: Turbo Boost
// console.log(s1.getPrice()); // Output: 300000

console.log(s1 instanceof SuperCar);

console.log(typeof("ayush"));
