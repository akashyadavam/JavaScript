#  Episode 8: `let` & `const` in JavaScript — Temporal Dead Zone

## 1. `let` vs `var` — Hoisting

Both `let` and `var` declarations are hoisted, but they behave differently.

```js
console.log(a); // ReferenceError
console.log(b); // undefined

let a = 10;
console.log(a); // 10

var b = 15;

console.log(window.a); // undefined
console.log(window.b); // 15 (classic browser script)
```

### Explanation

- `var` is initialized with `undefined` during the creation phase.
- `let` is also hoisted, but it cannot be accessed before initialization.
- Top-level `var` in a classic browser script becomes a property of `window`; top-level `let` does not.

## 2. Temporal Dead Zone (TDZ)

- The **Temporal Dead Zone** is the period from entering a variable's scope until its declaration is initialized.
- Accessing a `let` or `const` variable during this period causes a `ReferenceError`.

```js
{
    // TDZ starts
    console.log(a); // ReferenceError

    let a = 10; // TDZ ends
    console.log(a); // 10
}
```

## 3. `SyntaxError` — Duplicate Declarations

JavaScript rejects duplicate lexical declarations before executing the code.

```js
let a = 10;
let a = 100; // SyntaxError
```

This also fails in the same scope:

```js
let a = 10;
var a = 100; // SyntaxError
```

## 4. `let` vs `const`

### Using `let`

- A variable can be declared first and assigned later.
- Its value can be reassigned.

```js
let a;
a = 10;

console.log(a); // 10

a = 20;
console.log(a); // 20
```

### Using `const`

- A `const` declaration must be initialized immediately.
- Reassignment is not allowed.

```js
const b = 100;

b = 1000; // TypeError
```

This is invalid too:

```js
const b; // SyntaxError
```

## 5. Types of JavaScript Errors

| Error | Meaning |
|---|---|
| `ReferenceError` | Accessing an undeclared variable or a variable in its TDZ |
| `SyntaxError` | Invalid syntax or duplicate declarations |
| `TypeError` | An operation is invalid for the value, such as reassignment to a `const` variable |

### Common Error Examples

**1. ReferenceError — Not defined**

```js
console.log(x); // ReferenceError
```

`x` has not been declared in the accessible scope.

**2. ReferenceError — Before initialization**

```js
console.log(a);
let a = 10;
```

`a` is in its Temporal Dead Zone.

**3. SyntaxError — Already declared**

```js
let a = 10;
let a = 20;
```

The same lexical variable cannot be declared twice in the same scope.

**4. SyntaxError — Missing initializer**

```js
const a;
```

A `const` declaration requires an initial value.

**5. TypeError — Reassignment**

```js
const a = 10;
a = 20;
```

A `const` binding cannot be reassigned.

## 6. Best Practices

- Prefer `const` when the variable will not be reassigned.
- Use `let` when reassignment is needed.
- Avoid `var` in modern JavaScript.
- Declare variables near where they are used and initialize them before accessing them to avoid TDZ errors.

---

##  Quick Revision

| Keyword | Reassignment | Initialization |
|---|---|---|
| `var` | Allowed | Can be declared without a value |
| `let` | Allowed | Can be declared without a value |
| `const` | Not allowed | Must be initialized at declaration |

**Remember:** `let` and `const` are hoisted, but remain inaccessible during the Temporal Dead Zone.

---
