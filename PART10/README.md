#  Episode 10: Closures in JavaScript

## 1. What is a Closure?

- A **closure** is a function bundled with references to its **lexical environment**.
- It allows a function to access variables from its outer scope, even after the outer function has finished executing.

## 2. Basic Example

```js
function x() {
    var a = 7;

    function y() {
        console.log(a);
    }

    return y;
}

var z = x();

z(); // 7
```

### Explanation

- `y` is returned from `x()`.
- Even after `x()` finishes, `y` remembers the variable `a` from its lexical environment.
- Calling `z()` prints `7`.

## 3. Closure with Multiple Outer Scopes

```js
function z() {
    var b = 900;

    function x() {
        var a = 7;

        function y() {
            console.log(a, b);
        }

        y();
    }

    x();
}

z(); // 7 900
```

- Function `y()` accesses `a` from `x()` and `b` from `z()`.
- This demonstrates how closures use the lexical scope chain.

<img width="986" height="641" alt="Screenshot (1285)" src="https://github.com/user-attachments/assets/ebd87f0b-0bc7-43ca-8766-cdc5cf4db24c" />


---

## 4. Advantages of Closures

### 1. Data Hiding and Encapsulation

Closures can keep variables private and expose only selected functions.

```js
function counter() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}

const increment = counter();

console.log(increment()); // 1
console.log(increment()); // 2
console.log(increment()); // 3
```

The variable `count` cannot be accessed directly from outside the closure.

### 2. Module Pattern

Closures can keep internal state private while exposing public methods.

```js
const authModule = (function () {
    let loggedInUser = null;

    return {
        login(username) {
            loggedInUser = username;
        },
        logout() {
            loggedInUser = null;
        },
        getUserInfo() {
            return loggedInUser;
        }
    };
})();

authModule.login("john_doe");
console.log(authModule.getUserInfo()); // john_doe

authModule.logout();
console.log(authModule.getUserInfo()); // null
```

### 3. Currying

Currying transforms a function with multiple arguments into a sequence of functions that take arguments one at a time.

```js
const calculateTotalPrice = taxRate => price =>
    price + price * (taxRate / 100);

const calculateSalesTax = calculateTotalPrice(8);

console.log(calculateSalesTax(100)); // 108
```

The inner function remembers `taxRate` through a closure.

### 4. Memoization

Closures can retain cached results to avoid repeating expensive calculations.

```js
function memoize(fn) {
    const cache = {};

    return function (n) {
        if (n in cache) return cache[n];

        cache[n] = fn(n);
        return cache[n];
    };
}

const square = memoize(n => n * n);

console.log(square(5)); // 25
console.log(square(5)); // 25 (cached result)
```

### 5. `setTimeout` and Callbacks

Closures allow callback functions to access variables from their outer scope.

```js
function showMessage(message) {
    setTimeout(() => {
        console.log(message);
    }, 2000);
}

showMessage("Hello, JavaScript!");
```

The callback remembers `message` and prints it after two seconds.

---

## 5. Disadvantages of Closures

- **Memory usage:** Retained variables may stay in memory as long as they are reachable.
- **Memory leaks:** Unintentionally retaining references can prevent memory from being reclaimed.
- **Debugging complexity:** Nested scopes can make code harder to understand and debug.

> Closures do not automatically cause memory leaks or freeze the browser. Problems generally arise from inefficient code or unnecessarily retained references.

---

## 🎯 Quick Revision

| Concept | Meaning |
|---|---|
| Closure | Function plus access to its lexical environment |
| Data Hiding | Keeping variables private |
| Module Pattern | Exposing selected methods while hiding internal state |
| Currying | Transforming a multi-argument function into nested functions |
| Memoization | Caching results to avoid repeated calculations |
| Callback | A function passed to another function for later execution |

**Remember:** A closure allows a function to retain access to variables from its lexical environment even after the outer function has returned.

---
