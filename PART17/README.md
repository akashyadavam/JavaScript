# Episode 17: Trust Issues with setTimeout()

## Understanding setTimeout()

- `setTimeout()` is used to execute a callback function after a specified delay.
- However, it does **not guarantee that the callback will execute exactly after the given time**.
- It guarantees a minimum delay, not an exact execution time.
- The callback can execute later depending on the Call Stack and the Event Loop.

---

## Why Does setTimeout() Have Trust Issues?

Let's understand with an example:

```js
console.log("Start");

setTimeout(function cb() {
  console.log("Callback");
}, 5000);

console.log("End");

// Imagine millions of lines of code here
```

Suppose the remaining synchronous code takes 10 seconds to execute.

### Code Explanation

1. The Global Execution Context (GEC) is created and pushed into the Call Stack.
2. `console.log("Start")` executes and prints `Start`.
3. When JavaScript encounters `setTimeout()`, the callback `cb` is registered with the browser's Timer API.
4. The timer starts, and JavaScript moves to the next line without waiting.
5. `console.log("End")` executes and prints `End`.
6. Now, the remaining synchronous code starts executing and takes approximately 10 seconds.
7. Meanwhile, the 5-second timer expires in the background.
8. The callback becomes eligible for execution and is placed in the Callback Queue.
9. However, the Call Stack is still busy executing the remaining synchronous code.
10. The Event Loop cannot push the callback into the Call Stack until the current execution finishes.
11. After approximately 10 seconds, the GEC is removed from the Call Stack.
12. The callback can now enter the Call Stack and execute.

### Final Output

```text
Start
End
Callback
```

<text color="secondary" size="xs">The callback executes after approximately 10 seconds in this example, even though the timer was set to 5 seconds.</text>

### Why Does This Happen?

- JavaScript executes synchronous code using a single Call Stack.
- The Event Loop waits for the Call Stack to become empty before scheduling the next task.
- Even if the timer expires, the callback cannot interrupt the currently executing synchronous code.
- This is part of JavaScript's **Concurrency Model**.

Further Reading:

[MDN – JavaScript Event Loop and Concurrency Model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

---

## Never Block the Main Thread

The first rule of JavaScript:

**Do not block the Main Thread!**

- JavaScript normally executes code on a single main thread in the browser.
- If a long-running synchronous operation blocks the Call Stack:
  - Other JavaScript tasks cannot execute.
  - User interactions may become unresponsive.
  - UI updates can get delayed.
  - Timer callbacks must wait.

### Example: Blocking the Main Thread

- Observe the question and output in the above image.
- The main thread remains busy until the synchronous operation finishes.
- Even if a timer expires during this period, its callback has to wait.

---

## Important Rule of setTimeout()

`setTimeout()` guarantees that the callback will not execute before the specified delay has elapsed (subject to timer rules).

However, it does not guarantee execution at the exact specified time.

**Remember:**

```text
Timer expires ≠ Callback executes immediately
```

The callback must still wait for its turn in the task queue and for the Call Stack to become available.

---

## What Happens When Timeout = 0ms?

Does a `0ms` timeout mean the callback executes immediately?

**Absolutely not!**

Let's understand:

```js
console.log("Start");

setTimeout(function cb() {
  console.log("Callback");
}, 0);

console.log("End");

// Output:
// Start
// End
// Callback
```
<img width="833" height="515" alt="settimeout1" src="https://github.com/user-attachments/assets/9adc2c34-d1ce-4f99-89ba-eb946153aa28" />


### Code Explanation

1. `Start` is printed.
2. `setTimeout()` registers the callback with the Timer API.
3. Even with a 0ms delay, the callback is not executed immediately.
4. `End` is printed because synchronous code continues executing.
5. Once the timer callback is eligible, it is scheduled in the task queue.
6. After the current synchronous execution finishes, the callback gets its turn in the Call Stack.
7. `Callback` is printed.

### Why Use setTimeout(fn, 0)?

- It can be used to defer a less important task.
- It allows the current synchronous code to finish first.
- It does not mean that the callback will execute instantly after the current function.

---

## Key Takeaways

- `setTimeout()` does not guarantee exact execution time.
- It specifies a minimum delay, subject to browser timer rules.
- A timer callback cannot interrupt synchronous code.
- The Event Loop coordinates callback execution when the Call Stack is available.
- Long-running synchronous code blocks the Main Thread.
- A `0ms` timeout does not mean immediate execution.
- JavaScript uses a single Call Stack for normal main-thread JavaScript execution.
- Never block the Main Thread with long-running synchronous operations.

---
