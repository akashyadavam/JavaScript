#  Episode 9: Block Scope & Shadowing in JavaScript

## 1. What is a Block?

- A **Block** (also called a compound statement) groups multiple JavaScript statements inside `{}`.
- `let` and `const` are **block-scoped**, while `var` is not limited to a block.

```js
{
    var a = 10;
    let b = 20;
    const c = 30;
}
```

## 2. Block Scope & Accessibility

```js
{
    var a = 10;
    let b = 20;
    const c = 30;
}

console.log(a); // 10
console.log(b); // ReferenceError
console.log(c); // ReferenceError
```

### Explanation

- `var a` is not block-scoped, so `a` can be accessed outside the block.
- `let b` and `const c` belong to the block's lexical environment.
- Accessing `b` or `c` outside the block causes a `ReferenceError`.

---

## 3. What is Shadowing?

**Shadowing** occurs when a variable declared in an inner scope has the same name as a variable in an outer scope.

### Example 1: Shadowing with `var`

```js
var a = 100;

{
    var a = 10;
    console.log(a); // 10
}

console.log(a); // 10
```

### Explanation

- Both declarations refer to the same function-scoped or global `var` binding.
- The assignment `a = 10` changes the original value.
- A normal block does not create a separate scope for `var`.

### Example 2: Shadowing with `let`

```js
let b = 100;

{
    let b = 20;
    console.log(b); // 20
}

console.log(b); // 100
```

- The inner `b` belongs to the block scope.
- The outer `b` remains unchanged.
- The same principle applies to `const`.

### Example 3: Shadowing in Functions

```js
const c = 100;

function x() {
    const c = 10;
    console.log(c); // 10
}

x();
console.log(c); // 100
```

The local `c` inside `x()` shadows the outer `c` without changing its value.

<!-- Add your Block Scope diagram here -->

---

## 4. What is Illegal Shadowing?

Illegal shadowing occurs when a declaration conflicts with an existing declaration across scopes.

### Example 1: Invalid Shadowing

```js
let a = 20;

{
    var a = 10; // SyntaxError
}
```

- `var` cannot be used this way to redeclare a name already declared with `let` in an enclosing scope.

### Example 2: Valid Shadowing

```js
let a = 20;

{
    let a = 10;
    console.log(a); // 10
}

console.log(a); // 20
```

- Shadowing `let` with another `let` in a nested scope is valid.

### Example 3: `var` Inside a Function

```js
let a = 20;

function x() {
    var a = 10;
    console.log(a); // 10
}

x();
console.log(a); // 20
```

- This is valid because the function creates a separate scope for `var`.

**Note:** Arrow functions also follow lexical scope rules, although `var` inside an arrow function belongs to that function's own scope.

---

## 5. Quick Revision

| Concept | Meaning |
|---|---|
| Block | Groups statements inside `{}` |
| `var` | Function-scoped, not block-scoped |
| `let` | Block-scoped |
| `const` | Block-scoped |
| Shadowing | Inner declaration uses the same name as an outer variable
<img width="887" height="662" alt="Screenshot (1292)" src="https://github.com/user-attachments/assets/0866b7d9-a8e4-47a3-a2c2-d2fed662bf90" />

