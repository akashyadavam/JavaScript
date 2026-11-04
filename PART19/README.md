# Episode 19: map(), filter() & reduce()

> `map()`, `filter()` and `reduce()` are Higher-Order Functions in JavaScript.

## 1. Map Function

- The `map()` method is used to **transform an array**.
- It creates a new array by calling a callback function for every element of the original array.
- The callback function defines what transformation should be applied to each element.

**Syntax:**

```js
const output = arr.map(callbackFunction);
```

### Example 1: Double Each Element

```js
const arr = [5, 1, 3, 2, 6];

// Double the array elements
function double(x) {
  return x * 2;
}

const doubleArr = arr.map(double);

console.log(doubleArr);
// [10, 2, 6, 4, 12]
```

- Internally, `map()` calls the `double()` function for every array element.
- It collects the returned values into a new array.

### Example 2: Triple Each Element

```js
const arr = [5, 1, 3, 2, 6];

function triple(x) {
  return x * 3;
}

const tripleArr = arr.map(triple);

console.log(tripleArr);
// [15, 3, 9, 6, 18]
```

### Example 3: Convert Array Elements into Binary

```js
const arr = [5, 1, 3, 2, 6];

function binary(x) {
  return x.toString(2);
}

const binaryArr = arr.map(binary);

console.log(binaryArr);
// ["101", "1", "11", "10", "110"]
```

The above code can also be written using an anonymous function:

```js
const binaryArr = arr.map(function (x) {
  return x.toString(2);
});
```

Or using an Arrow Function:

```js
const binaryArr = arr.map((x) => x.toString(2));
```

**Remember:**

`map()` transforms every element and returns a new array of the same length as the original array.

---

## 2. Filter Function

- The `filter()` method is used to filter elements from an array based on a condition.
- It creates a new array containing only those elements for which the callback function returns `true` (truthy).
- Elements for which the callback returns `false` (falsy) are excluded.

### Example: Filter Odd Numbers

```js
const arr = [5, 1, 3, 2, 6];

function isOdd(x) {
  return x % 2;
}

const oddArr = arr.filter(isOdd);

console.log(oddArr);
// [5, 1, 3]
```

The same code using an Arrow Function:

```js
const oddArr = arr.filter((x) => x % 2);
```

**How does it work?**

| Element | Condition | Result |
|---|---|---|
| 5 | 5 % 2 = 1 | Included |
| 1 | 1 % 2 = 1 | Included |
| 3 | 3 % 2 = 1 | Included |
| 2 | 2 % 2 = 0 | Excluded |
| 6 | 6 % 2 = 0 | Excluded |

**Remember:**

- `filter()` returns a new array.
- The returned array may have fewer elements than the original array.
- It does not modify the original array.

---

## 3. Reduce Function

- The `reduce()` method is used to reduce an array into a single accumulated result.
- The result can be a number, string, object, array or any other value.
- It executes a callback function for each element while maintaining an accumulated value.

### Example 1: Find the Sum of Array Elements

**Without reduce():**

```js
const arr = [5, 1, 3, 2, 6];

function findSum(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }

  return sum;
}

console.log(findSum(arr));
// 17
```

**Using reduce():**

```js
const arr = [5, 1, 3, 2, 6];

const sumOfElem = arr.reduce(function (accumulator, current) {
  accumulator = accumulator + current;
  return accumulator;
}, 0);

console.log(sumOfElem);
// 17
```

### Understanding Accumulator and Current

- `accumulator`: Stores the accumulated result from previous iterations.
- `current`: Represents the current element of the array.
- `0`: Initial value of the accumulator.

**Iteration:**

| Current | Accumulator Before | Accumulator After |
|---:|---:|---:|
| 5 | 0 | 5 |
| 1 | 5 | 6 |
| 3 | 6 | 9 |
| 2 | 9 | 11 |
| 6 | 11 | 17 |

The accumulator is updated after every iteration.

---

### Example 2: Find Maximum Number in an Array

**Without reduce():**

```js
const arr = [5, 1, 3, 2, 6];

function findMax(arr) {
  let max = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
}

console.log(findMax(arr));
// 6
```

**Using reduce():**

```js
const arr = [5, 1, 3, 2, 6];

const output = arr.reduce((acc, current) => {
  if (current > acc) {
    acc = current;
  }

  return acc;
}, -Infinity);

console.log(output);
// 6
```

The accumulator can also be named `max` because it represents the maximum value found so far.

```js
const output = arr.reduce((max, current) => {
  if (current > max) {
    max = current;
  }

  return max;
}, -Infinity);

console.log(output);
// 6
```

---

## 4. Tricky Map and Reduce Questions

Consider the following array of objects:

```js
const users = [
  { firstName: "Alok", lastName: "Raj", age: 23 },
  { firstName: "Ashish", lastName: "Kumar", age: 29 },
  { firstName: "Ankit", lastName: "Roy", age: 29 },
  { firstName: "Pranav", lastName: "Mukherjee", age: 50 },
];
```

### Question 1: Get an Array of Full Names

Expected Output:

```js
["Alok Raj", "Ashish Kumar", "Ankit Roy", "Pranav Mukherjee"]
```

**Solution using map():**

```js
const fullNameArr = users.map(
  (user) => user.firstName + " " + user.lastName
);

console.log(fullNameArr);
```

- `map()` iterates over every user object.
- It extracts `firstName` and `lastName`.
- It combines them into a full name.
- Finally, it returns a new array of full names.

### Question 2: Count People According to Their Age

Expected Output:

```js
{
  23: 1,
  29: 2,
  50: 1
}
```

**Why use reduce()?**

We want to derive a single object containing the count of people belonging to each age group.

```js
const report = users.reduce((acc, curr) => {
  if (acc[curr.age]) {
    acc[curr.age] = acc[curr.age] + 1;
  } else {
    acc[curr.age] = 1;
  }

  return acc;
}, {});

console.log(report);
// { 23: 1, 29: 2, 50: 1 }
```

**Understanding the Code:**

- `acc` is the accumulator object.
- `curr` represents the current user object.
- `acc[curr.age]` checks whether that age already exists in the object.
- If it exists, its count is incremented.
- Otherwise, a new age property is created with value `1`.
- The updated accumulator is returned after every iteration.

---

## 5. Function Chaining

Function chaining means calling multiple methods one after another on the result returned by the previous method.

### Question: Get First Names of All People Whose Age Is Less Than 30

```js
const users = [
  { firstName: "Alok", lastName: "Raj", age: 23 },
  { firstName: "Ashish", lastName: "Kumar", age: 29 },
  { firstName: "Ankit", lastName: "Roy", age: 29 },
  { firstName: "Pranav", lastName: "Mukherjee", age: 50 },
];
```

**Solution using filter() and map():**

```js
const output = users
  .filter((user) => user.age < 30)
  .map((user) => user.firstName);

console.log(output);
// ["Alok", "Ashish", "Ankit"]
```

**How does it work?**

1. `filter()` selects users whose age is less than 30.
2. `map()` extracts the first name from each filtered user.
3. A new array containing the required first names is returned.

### Homework Challenge: Implement the Same Logic Using reduce()

```js
const output = users.reduce((acc, curr) => {
  if (curr.age < 30) {
    acc.push(curr.firstName);
  }

  return acc;
}, []);

console.log(output);
// ["Alok", "Ashish", "Ankit"]
```

**Understanding:**

- The initial accumulator is an empty array `[]`.
- If the current user's age is less than 30, their first name is pushed into the accumulator.
- The updated accumulator is returned after every iteration.

---

## 6. Quick Comparison: map() vs filter() vs reduce()

| Method | Purpose | Returns |
|---|---|---|
| `map()` | Transforms every element | New array |
| `filter()` | Selects elements based on a condition | New array |
| `reduce()` | Accumulates values into a result | Any value |

### Important Points

- All three are Higher-Order Functions.
- All three accept a callback function.
- `map()` and `filter()` return new arrays.
- `reduce()` can return a number, object, string, array or any other value.
- These methods do not modify the original array when used normally with non-mutating callbacks.

---
