#  Episode 6: `undefined` vs `not defined` in JavaScript

## 1. What is `undefined`?

- During the Memory Creation Phase, variables declared with `var` are initialized with **`undefined`**.
- It means the variable exists, but it has not yet been assigned its actual value.

## 2. What is `not defined`?

- When a variable has not been declared and we try to access it, JavaScript throws a **`ReferenceError`**.
- In simple terms, the variable cannot be found in the accessible scope.

> **Remember:** `undefined` and `not defined` are two different things.

## 3. Example

```js
console.log(x); // undefined

var x = 25;

console.log(x); // 25

console.log(a); // ReferenceError: a is not defined
```

### Output

```text
undefined
25
ReferenceError: a is not defined
```

### Explanation

- `console.log(x)` prints `undefined` because `x` is declared but not yet assigned `25`.
- After assignment, `x` contains `25`.
- `a` has not been declared, so accessing it throws a `ReferenceError`.

## 4. `undefined` vs `not defined`

| `undefined` | `not defined` |
|---|---|
| Variable exists but has no assigned value yet. | Variable has not been declared in the accessible scope. |
| It is a JavaScript value. | It is commonly seen in a `ReferenceError` message. |
| Example: `var x;` | Example: `console.log(a);` when `a` is undeclared. |

## 5. JavaScript Is Dynamically Typed

- JavaScript is a **dynamically typed language**.
- A variable can hold values of different data types during execution.

```js
var a = 5;
console.log(a); // 5

a = true;
console.log(a); // true

a = "hello";
console.log(a); // hello
```

The same variable `a` can hold a number, a boolean and then a string.

## 6. Important Tip

- Avoid assigning `undefined` manually unless there is a specific reason.
- Prefer meaningful values or `null` when you intentionally want to represent the absence of a value.

---

## 🎯 Quick Revision

- **`undefined`** → Variable exists, but its value is currently `undefined`.
- **Not defined** → Accessing an undeclared variable causes a `ReferenceError`.
- **Dynamically typed** → A variable can hold values of different data types.
- **Best practice** → Avoid manually assigning `undefined` without a good reason.

---

