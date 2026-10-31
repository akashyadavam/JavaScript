#  Episode 14: Callback Functions in JS ft. Event Listeners

## 1. Callback Functions

JavaScript functions are **First-Class Citizens**. This means we can pass a function as an argument to another function.

A function passed as an argument to another function is called a **Callback Function**.

In simple words, we give one function the responsibility or ability to call another function.

### Example 1: setTimeout()

```js
setTimeout(function () {
    console.log("Timer");
}, 1000);
```

- First argument: Callback function.
- Second argument: Delay in milliseconds (1000ms = 1 second).
- The callback executes after the timer expires, when the call stack is available.

### Example 2: Callback Execution

```js
setTimeout(function () {
    console.log("timer");
}, 5000);

function x(y) {
    console.log("x");
    y();
}

x(function y() {
    console.log("y");
});

// Output:
// x
// y
// timer (after approximately 5 seconds)
```

**Explanation:**

- JavaScript executes `x()` first.
- Inside `x()`, `"x"` is printed.
- Then `y()` is called and `"y"` is printed.
- After `x()` finishes, its execution context is removed from the call stack.
- After approximately 5 seconds, the timer callback becomes eligible to execute.
- It runs when the call stack is available.

### Important Concepts

- JavaScript executes synchronous code on a single main thread.
- The call stack executes functions one at a time.
- Asynchronous operations allow JavaScript to handle time-consuming tasks without blocking the main thread.
- Callbacks are one way to handle asynchronous results.
- If a synchronous operation takes 30 seconds, it blocks the main thread for that duration.

**Important:** `setTimeout()` does not make JavaScript itself asynchronous. The timer is handled by the runtime environment, and its callback is scheduled for later execution.

---

## 2. Callback Example: Print A, B, C in Order

Suppose we want to print A, B and C in the same order, even though each timer has a random delay.

```js
function printStr(str, cb) {
    setTimeout(() => {
        console.log(str);
        cb();
    }, Math.floor(Math.random() * 100) + 1);
}

function printAll() {
    printStr("A", () => {
        printStr("B", () => {
            printStr("C", () => {});
        });
    });
}

printAll();

// Output:
// A
// B
// C
```<img width="817" height="736" alt="Screenshot (1297)" src="https://github.com/user-attachments/assets/aa837096-61f7-4e28-9f91-2e5befe0bb2d" />


**Explanation:**

- `printStr()` accepts a string and a callback.
- First, A is printed.
- Only after A is printed, its callback starts printing B.
- Similarly, B's callback starts printing C.
- This ensures the correct order despite random delays.

This pattern is called **Callback Nesting**. Excessive nesting can
