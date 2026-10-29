# Episode 3: Hoisting in JavaScript (Variables & Functions)

## 1. What is Hoisting?

- **Hoisting** is JavaScript's behavior where declarations are processed during the **Memory Creation Phase**, before code execution begins.
- Variables declared using `var` are initialized with `undefined`.
- Function declarations store their complete code in memory.

## 2. Hoisting with Variables and Functions

Let's observe the following example:

```js
getName();
console.log(x);

var x = 7;

function getName() {
    console.log("Namaste Javascript");
}
```

### Output

```text
Namaste Javascript
undefined
```

### Explanation

- `getName()` works because the complete function code is available in memory.
- `console.log(x)` prints `undefined` because `x` has been declared but its value `7` has not yet been assigned.
- When execution reaches `var x = 7`, the value of `x` becomes `7`.

## 3. Memory Creation Phase

Before executing the code, JavaScript prepares memory for declarations.

| Identifier | Initial Value |
|---|---|
| `x` | `undefined` |
| `getName` | Complete function code |

<!-- Add your Memory Creation Phase image here -->

## 4. Accessing an Undeclared Variable

Consider this example:

```js
getName();
console.log(x);

function getName() {
    console.log("Namaste Javascript");
}
```

### Output

```text
Namaste Javascript
ReferenceError: x is not defined
```

### Explanation

- The function executes successfully.
- `x` was never declared, so accessing it causes a **ReferenceError**.
- Hoisting does not create variables that have never been declared.

## 5. Function Declaration vs Function Expression

Consider another example:

```js
getName();

var getName = function () {
    console.log("Namaste Javascript");
};
```

### Output

```text
TypeError: getName is not a function
```

### Explanation

- During memory creation, `getName` is initialized with `undefined`.
- The function is assigned to `getName` only when execution reaches the assignment.
- Before that assignment, `getName()` attempts to call `undefined`, causing a **TypeError**.
- The remaining code does not execute after this error.

## 6. Function Declaration Example

```js
getName();

function getName() {
    console.log("Namaste Javascript");
}
```

### Output

```text
Namaste Javascript
```

A **function declaration** can be called before its position in the code because its complete definition is available during memory creation.

## 🎯 Quick Revision

| Concept | Result |
|---|---|
| Access `var` before assignment | `undefined` |
| Call a function declaration before its position | Works |
| Access an undeclared variable | `ReferenceError` |
| Call a `var` function expression before assignment | `TypeError` |

> **Remember:** Hoisting does not literally move code upward. It occurs because JavaScript processes declarations during the creation of the Execution Context.
