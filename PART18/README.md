# Episode 18: Higher-Order Functions ft. Functional Programming

## What is a Higher-Order Function?

A **Higher-Order Function (HOF)** is a function that does at least one of the following:

1. Takes one or more functions as arguments.
2. Returns another function as its result.

### Example

```js
function x() {
  console.log("Hi");
}

function y(x) {
  x();
}

y(x); // Hi

// y is a Higher-Order Function
// x is a Callback Function
```

- Function `y` accepts another function as an argument, so `y` is a Higher-Order Function.
- Function `x` is passed as an argument, so `x` is a Callback Function.

---

## Understanding Higher-Order Functions with an Interview Problem

**Problem:** Given an array of radii, calculate the area of each circle and store the results in a new array.

### Approach 1: Using a Normal Function

```js
const radius = [1, 2, 3, 4];

const calculateArea = function (radius) {
  const output = [];

  for (let i = 0; i < radius.length; i++) {
    output.push(Math.PI * radius[i] * radius[i]);
  }

  return output;
};

console.log(calculateArea(radius));
```

**Output:**

```text
[3.14159..., 12.56637..., 28.27433..., 50.26548...]
```

This solution works perfectly fine.

But what if the requirement changes and we need to calculate the circumference instead?

### Approach 2: Calculating Circumference

```js
const radius = [1, 2, 3, 4];

const calculateCircumference = function (radius) {
  const output = [];

  for (let i = 0; i < radius.length; i++) {
    output.push(2 * Math.PI * radius[i]);
  }

  return output;
};

console.log(calculateCircumference(radius));
```

**Problem:**

- We are repeating the same loop in multiple functions.
- Only the calculation logic is changing.
- This violates the **DRY (Don't Repeat Yourself) Principle**.

Can we write a better solution?

---

## Better Approach: Functional Programming

Instead of repeating the loop, we can separate the calculation logic into individual functions and pass them to a common function.

```js
const radiusArr = [1, 2, 3, 4];

// Logic to calculate area
const area = function (radius) {
  return Math.PI * radius * radius;
};

// Logic to calculate circumference
const circumference = function (radius) {
  return 2 * Math.PI * radius;
};

// Higher-Order Function
const calculate = function (radiusArr, operation) {
  const output = [];

  for (let i = 0; i < radiusArr.length; i++) {
    output.push(operation(radiusArr[i]));
  }

  return output;
};

console.log(calculate(radiusArr, area));
console.log(calculate(radiusArr, circumference));
```

### Output

```text
[
  3.14159...,
  12.56637...,
  28.27433...,
  50.26548...
]

[
  6.28318...,
  12.56637...,
  18.84955...,
  25.13274...
]
```

### Understanding the Code

- `area()` contains the logic for calculating the area.
- `circumference()` contains the logic for calculating the circumference.
- `calculate()` handles the common looping logic.
- We pass the required operation as an argument.
- The `calculate()` function executes that operation for every radius.

**Important:**

- `calculate()` is a Higher-Order Function because it accepts another function as an argument.
- `area()` and `circumference()` are Callback Functions when passed to `calculate()`.

### Why is this Approach Better?

- Avoids code duplication.
- Separates calculation logic from iteration logic.
- Makes code reusable and maintainable.
- This is an example of Functional Programming.

---

## Understanding the map() Function

JavaScript already provides a built-in Higher-Order Array method called `map()`.

- `map()` takes a callback function as an argument.
- It executes the callback for every element of the array.
- It returns a new array containing the results.
- It does not modify the original array.

### Using map()

```js
const radiusArr = [1, 2, 3, 4];

const area = function (radius) {
  return Math.PI * radius * radius;
};

console.log(radiusArr.map(area));
```

This gives the same result as:

```js
console.log(calculate(radiusArr, area));
```

Our `calculate()` function is implementing the basic behavior of the built-in `map()` method.

---

## Polyfill of map()

A **Polyfill** is a custom implementation of a feature that provides similar functionality to an existing built-in feature.

Let's implement our own version of `map()`.

```js
const radiusArr = [1, 2, 3, 4];

const area = function (radius) {
  return Math.PI * radius * radius;
};

// Polyfill of map()
Array.prototype.calculate = function (operation) {
  const output = [];

  for (let i = 0; i < this.length; i++) {
    output.push(operation(this[i]));
  }

  return output;
};

console.log(radiusArr.calculate(area));
```

### Understanding this Keyword

- `Array.prototype.calculate` adds a custom method to the Array prototype.
- `this` refers to the array on which the method is called.
- `this.length` gives the length of that array.
- `this[i]` accesses each element.
- `operation(this[i])` executes the callback for each element.
- The result is stored in a new array.

**Comparison:**

```js
// Built-in map()
radiusArr.map(area);

// Our custom implementation
radiusArr.calculate(area);
```

Both produce the same result for this example.

<text color="secondary" size="xs">Note: This is a basic educational polyfill. It demonstrates the core idea of map(), but does not implement every specification detail of the native method. Avoid adding custom methods to Array.prototype in production code.</text>

---

## Key Takeaways

- A Higher-Order Function accepts another function as an argument or returns a function.
- A Callback Function is passed to another function to be called later or as part of its execution.
- DRY stands for Don't Repeat Yourself.
- Functional Programming encourages reusable functions and separation of logic.
- `map()` is a built-in Higher-Order Array method.
- `map()` returns a new array without modifying the original array.
- A Polyfill is a custom implementation of an existing feature.
- `this` inside our custom array method refers to the array on which the method is called.

---
