# Episode 14: Callback Functions in JS ft. Event Listeners

## Callback Functions

- JavaScript functions are **First-Class Citizens**, which means we can:
  - Pass functions as arguments to other functions.
  - Return functions from other functions.
  - Assign functions to variables.

- When we pass one function (A) as an argument to another function (B), function A is called a **Callback Function**.

- We are basically giving function B the responsibility to call function A whenever required.

- Callback functions help JavaScript handle asynchronous operations.

### Example 1: setTimeout()

```js
setTimeout(function () {
  console.log("Timer");
}, 1000);

// First argument: Callback function
// Second argument: Delay in milliseconds
```

- JavaScript is a **synchronous, single-threaded language**.
- However, JavaScript can perform asynchronous operations with the help of browser APIs, Node.js APIs, callbacks, and the Event Loop.

### Example 2: Synchronous vs Asynchronous Execution

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
// timer
```

**How does it work?**

- First, `setTimeout()` registers its callback with the timer API.
- Then, function `x()` executes and calls function `y()`.
- Both `x()` and `y()` are removed from the Call Stack after execution.
- After 5 seconds, the timer callback becomes eligible to execute and is placed in the Callback Queue.
- The Event Loop pushes it into the Call Stack when the stack is empty.

**Important Points:**

- All JavaScript functions execute through the Call Stack.
- If an operation blocks the Call Stack, it is called **Blocking the Main Thread**.
- For example, if `x()` takes 30 seconds to execute synchronously, JavaScript cannot execute other JavaScript code on that thread during that time.
- Avoid blocking the main thread with long-running synchronous operations.

### Example 3: Callback for Maintaining Execution Order

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
```

- `setTimeout()` uses a random delay.
- Normally, the callbacks could complete in any order.
- By calling the next function inside the previous callback, we maintain the required execution order: A → B → C.
- This pattern is known as **Callback Nesting**.

---

## Event Listeners

- Event Listeners allow us to execute a function when a particular event occurs, such as:
  - Click
  - Mouseover
  - Keydown
  - Scroll

### Example: Adding an Event Listener

**index.html**

```html
<button id="clickMe">Click Me!</button>
```

**index.js**

```js
document.getElementById("clickMe").addEventListener("click", function xyz() {
  console.log("Button clicked");
});
```

**How does it work?**

- `getElementById()` selects the button.
- `addEventListener()` registers the callback function.
- The callback function `xyz` does not execute immediately.
- Whenever the button is clicked, the browser schedules the callback for execution.
- When the Call Stack is available, the callback executes.

---

## Implementing an Increment Counter

### 1. Using a Global Variable

```js
let count = 0;

document
  .getElementById("clickMe")
  .addEventListener("click", function xyz() {
    console.log("Button clicked", ++count);
  });
```

**Problem:**

- `count` is a global variable.
- Anyone with access to the global scope can modify it.
- This is not a good approach when we want data hiding.

### 2. Using Closures for Data Abstraction

```js
function attachEventList() {
  // Creating a local variable
  let count = 0;

  document
    .getElementById("clickMe")
    .addEventListener("click", function xyz() {
      console.log("Button clicked", ++count);
    });
}

attachEventList();
```

**How does Closure work here?**

1. `attachEventList()` is called and `count` is initialized to `0`.
2. The callback function is registered with the button using `addEventListener()`.
3. `attachEventList()` finishes its execution.
4. Even after the outer function finishes, the callback remembers its lexical environment.
5. Whenever the button is clicked, the callback accesses and increments the same `count` variable.

**Output on successive clicks:**

```text
Button clicked 1
Button clicked 2
Button clicked 3
Button clicked 4
```

**Advantages:**

- `count` is not accessible directly from the global scope.
- Only the callback can access and modify it.
- This is an example of **Data Hiding using Closures**.

<img width="817" height="736" alt="Screenshot (1297)" src="https://github.com/user-attachments/assets/aa837096-61f7-4e28-9f91-2e5befe0bb2d" />

---

## Garbage Collection and removeEventListener()

- Event Listeners can keep callback functions and their referenced variables alive in memory.
- When a callback forms a closure, its outer lexical environment may remain reachable as long as the callback is registered and reachable.
- Even if the Call Stack becomes empty, the callback and its required variables are not automatically garbage collected.
- This is because the browser may need the callback again when the event occurs.

### Removing Event Listeners

We should remove event listeners when they are no longer required, especially for frequently occurring events such as:

- `click`
- `mouseover`
- `scroll`

**Example:**

```js
function handleClick() {
  console.log("Button clicked");
}

const button = document.getElementById("clickMe");

button.addEventListener("click", handleClick);

// Removing the event listener
button.removeEventListener("click", handleClick);
```

**Important:** To remove an event listener, we must pass the same function reference that was used while registering it. An anonymous function written separately will not match the original callback.

---

## Key Takeaways

- Functions are First-Class Citizens in JavaScript.
- A function passed as an argument to another function is called a Callback Function.
- Callback functions are useful for handling asynchronous operations.
- JavaScript is single-threaded and uses the Call Stack to execute JavaScript code.
- The Event Loop coordinates callback execution when the Call Stack is available.
- `addEventListener()` registers a callback that executes when the specified event occurs.
- Closures help achieve data hiding and data abstraction.
- `removeEventListener()` helps clean up event listeners when they are no longer needed.

---

