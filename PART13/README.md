#  Episode 13: First Class Functions ft. Anonymous Functions

> **Functions are the heart ♥ of JavaScript.**

## Q1. What is a Function Statement?

A function declaration is also known as a **Function Statement**. It is a way of defining a function using the `function` keyword.

```js
function a() {
    console.log("Hello");
}

a(); // Hello
```

---

## Q2. What is a Function Expression?

Assigning a function to a variable is called a **Function Expression**. Here, a function is treated like a value.

```js
var b = function() {
    console.log("Hello");
};

b(); // Hello
```

---

## Q3. Difference between Function Statement and Function Expression

The major difference between these two is **Hoisting**.

```js
a(); // Hello A
b(); // TypeError: b is not a function

function a() {
    console.log("Hello A");
}

var b = function() {
    console.log("Hello B");
};
```

**Why does this happen?**

During the memory creation phase:

- `a` is stored as a complete function in memory.
- `b` is created as a variable and initialized with `undefined`.
- When `a()` is called, the function is already available.
- When `b()` is called, `b` is still `undefined` because execution has not reached its function assignment.

Therefore, `a()` works but `b()` throws a `TypeError`.

---

## Q4. What is a Function Declaration?

Function Declaration is another name for a **Function Statement**.

```js
function greet() {
    console.log("Namaste");
}

greet(); // Namaste
```

---

## Q5. What is an Anonymous Function?

A function without a name is called an **Anonymous Function**.

```js
function() {
    console.log("Hello");
}
```

**Output:** `SyntaxError`

**Why?**
- A standalone function declaration requires a function name.
- Anonymous functions are commonly used as values in function expressions and callbacks.

Example:

```js
var b = function() {
    console.log("Hello");
};

b(); // Hello
```

---

## Q6. What is a Named Function Expression?

A function expression in which the function has a name is called a **Named Function Expression**.

```js
var b = function xyz() {
    console.log("b called");
};

b();   // b called
xyz(); // ReferenceError: xyz is not defined
```

**Why does `xyz()` give an error?**

- `xyz` is available only inside the function's own scope.
- It is not accessible outside through the surrounding scope.
- We call the function using the variable `b`.

---

## Q7. What is the difference between Parameters and Arguments?

```js
var b = function(param1, param2) {
    console.log("b called");
};

b("Hello", "JavaScript");
```

- **Parameters:** Variables or identifiers written in the function definition (`param1`, `param2`).
- **Arguments:** Actual values passed during the function call (`"Hello"`, `"JavaScript"`).

---

## Q8. What are First-Class Functions (First-Class Citizens)?

JavaScript treats functions as **first-class citizens**.

This means functions can be:

1. Assigned to variables.
2. Passed as arguments to other functions.
3. Returned from other functions.
4. Stored in data structures like arrays and objects.

### 1. Passing a function as an argument

```js
var b = function(param1) {
    console.log(param1);
};

b(function() {});
```

**Output:**
```text
function() {}
```

Another way:

```js
var b = function(param1) {
    console.log(param1);
};

function xyz() {}

b(xyz);
```

Here, function `xyz` is passed as an argument to `b`.

### 2. Returning a function from another function

```js
var b = function(param1) {
    return function() {
        console.log("Hello");
    };
};

console.log(b()); // Returns the inner function
```

To execute the returned function:

```js
b()(); // Hello
```

**Explanation:**
- First `()` calls `b()` and returns the inner function.
- Second `()` executes the returned inner function.

---

##  Quick Revision

| Concept | Meaning |
|---|---|
| Function Statement | Function declaration using `function` |
| Function Expression | Assigning a function to a variable |
| Function Declaration | Another name for Function Statement |
| Anonymous Function | Function without a name |
| Named Function Expression | Function expression with a name |
| Parameters | Variables in function definition |
| Arguments | Values passed during function call |
| First-Class Functions | Functions can be passed, returned and assigned like values |

**Remember:** First-Class Functions are a feature of JavaScript, whereas a Higher-Order Function (HOF) is a function that takes another function as an argument or returns a function.

---



[![Episode 13: First Class Functions ft. Anonymous Functions](https://img.youtube.com/vi/SHINoHxvTso/0.jpg)](https://www.youtube.com/watch?v=SHINoHxvTso)

**Episode 13 — First Class Functions ft. Anonymous Functions | Akshay Saini**
