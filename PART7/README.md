#  Episode 7: Scope Chain, Scope & Lexical Environment

## 1. What is Scope?

- **Scope** determines where a variable or function can be accessed in JavaScript.
- JavaScript follows **Lexical Scope**, meaning access depends on where functions and variables are defined in the source code.

## 2. Case 1: Accessing a Global Variable

```js
function a() {
    console.log(b); // 10
}

var b = 10;
a();
```

**Output:**
```text
10
```

- Function `a()` can access `b` because `b` is declared in the global scope.

## 3. Case 2: Nested Functions

```js
function a() {
    c();

    function c() {
        console.log(b); // 10
    }
}

var b = 10;
a();
```

**Output:**
```text
10
```

- Inner function `c()` can also access variables from the global scope through its outer lexical environment.

## 4. Case 3: Local Variable Takes Precedence

```js
function a() {
    c();

    function c() {
        var b = 100;
        console.log(b); // 100
    }
}

var b = 10;
a();
```

**Output:**
```text
100
```

- JavaScript finds the local `b` first, so it prints `100` instead of the global value `10`.
- This is called **Variable Shadowing**.

## 5. Case 4: Local vs Global Scope

```js
function a() {
    var b = 10;
    c();

    function c() {
        console.log(b); // 10
    }
}

a();
console.log(b); // ReferenceError
```

**Output:**
```text
10
ReferenceError: b is not defined
```

- Function `c()` can access `b` from its outer function `a()`.
- The global scope cannot access the local variable `b` inside `a()`.

---

## 6. What is a Lexical Environment?

- A **Lexical Environment** consists of the local environment (bindings) and a reference to its outer lexical environment.
- Whenever an Execution Context is created, JavaScript establishes the corresponding lexical environment.
- **Lexical** means that scope is determined by where code is written, not where a function is called.

### Example

```js
function a() {
    var b = 10;

    function c() {
        console.log(b);
    }

    c();
}

a();
```

- Function `c()` is lexically inside function `a()`.
- Therefore, `c()` can access `b` from `a()`.

<img width="1091" height="605" alt="Screenshot (1282)" src="https://github.com/user-attachments/assets/96b14267-68fd-4ffd-bfd4-5d340f6e9147" />


---

## 7. What is the Scope Chain?

- When JavaScript cannot find a variable in the current scope, it searches the outer lexical environment.
- This continues outward until the variable is found or the global environment is reached.
- If the variable is not found anywhere, JavaScript throws a `ReferenceError`.

### Scope Chain Structure

```text
Global Scope
    ↑
Function a()
    ↑
Function c()
```

Function `c()` can access variables in `a()` and the global scope, but those outer scopes cannot access variables declared only inside `c()`.

<img width="840" height="623" alt="Screenshot (1283)" src="https://github.com/user-attachments/assets/b5f009ec-d520-44a8-84c1-c45d98a25d06" />


---

## 8. Quick Revision

| Concept | Meaning |
|---|---|
| Scope | Where a variable can be accessed |
| Lexical Scope | Scope determined by source-code structure |
| Lexical Environment | Local bindings plus reference to the outer environment |
| Scope Chain | Searching through outer lexical environments |
| Variable Shadowing | A local variable takes precedence over an outer variable |

> **Remember:** An inner function can access variables from its outer lexical scopes, but an outer function cannot access variables declared only inside an inner function.

---

