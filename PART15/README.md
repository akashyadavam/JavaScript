# Episode 15: Asynchronous JavaScript & Event Loop from Scratch

> **Note:** The Call Stack executes every Execution Context that enters it. Time, tide and JavaScript wait for none. The Call Stack has no timer!

## Introduction

- A browser contains a JavaScript Engine, which has a **Call Stack** to execute JavaScript code.
- The Call Stack manages different Execution Contexts:
  - Global Execution Context (GEC)
  - Function Execution Context (FEC)

- But browsers have many other superpowers:
  - Local Storage
  - Timers
  - DOM Manipulation
  - Geolocation
  - Bluetooth
  - Fetch API

- JavaScript needs a way to communicate with these browser features. This is possible through **Web APIs**.

<img width="824" height="416" alt="eventloop1" src="https://github.com/user-attachments/assets/07871eb5-9a8f-485e-91a1-e3f72b2324c8" />


---

## Web APIs

Web APIs are provided by the browser. They are not part of the JavaScript language itself.

They allow JavaScript to interact with browser features.
<img width="737" height="403" alt="eventloop2" src="https://github.com/user-attachments/assets/4442be30-0039-4b5f-af95-5657cc491bbe" />


### Some Important Web APIs

| Web API | Purpose |
|---|---|
| `setTimeout()` | Executes a callback after a specified delay |
| DOM APIs | Access and manipulate HTML elements |
| `fetch()` | Makes HTTP requests to external servers |
| `localStorage` | Stores data in the browser |
| `console` | Provides debugging and logging methods |
| `location` | Provides information about the current URL |

- In browsers, these APIs are generally accessible through the global object `window`.
- Since `window` is the global object, we usually don't need to write it explicitly.

```js
window.setTimeout(() => {
  console.log("Hello");
}, 1000);

// Both are valid:
window.console.log("Hello");
console.log("Hello");
```

---

## Understanding setTimeout() and the Event Loop

Let's understand the following example:
<img width="737" height="403" alt="eventloop2" src="https://github.com/user-attachments/assets/53c7198f-f39b-46f8-a0fd-675e3b125bd9" />
<img width="824" height="425" alt="eventloop3" src="https://github.com/user-attachments/assets/77370787-1bc2-427a-bf79-35845f0124ca" />





```js
console.log("Start");

setTimeout(function cb() {
  console.log("Timer");
}, 5000);

console.log("End");

// Output:
// Start
// End
// Timer
```

### Code Explanation

1. The Global Execution Context (GEC) is created and pushed into the Call Stack.
2. `console.log("Start")` executes and prints `Start`.
3. `setTimeout()` registers the callback `cb` with the browser's timer API and starts the timer.
4. `console.log("End")` executes and prints `End`.
5. The GEC finishes and is removed from the Call Stack.
6. After approximately 5 seconds, the timer expires and the callback becomes eligible for execution.
7. The callback is placed into the Callback Queue.
8. The Event Loop checks whether the Call Stack is empty and allows the callback to enter the Call Stack.
9. The callback executes and prints `Timer`.

---

## Event Loop and Callback Queue

### Question: How does the callback execute after 5 seconds?

- A callback cannot directly enter the Call Stack just because its timer has expired.
- It first enters the **Callback Queue (Task Queue)**.
- The Event Loop continuously checks:
  - Is the Call Stack empty?
  - Is there a callback waiting in the queue?
- If the Call Stack is empty, the Event Loop allows the next eligible callback to execute.



### Example: Event Listener

Let's understand another example.
<img width="825" height="424" alt="eventloop4" src="https://github.com/user-attachments/assets/cb088bd2-84bc-48bf-ad47-ecf95aeef5c6" />

<img width="810" height="423" alt="eventloop5" src="https://github.com/user-attachments/assets/39839860-ca8e-4719-a5e4-5d0f7f89e13a" />




```js
console.log("Start");

document.getElementById("btn").addEventListener("click", function cb() {
  console.log("Callback");
});

console.log("End");

// Output initially:
// Start
// End
//
// When the button is clicked:
// Callback
```

### Code Explanation

- `addEventListener()` registers the callback function `cb` for the click event.
- The callback does not execute immediately.
- `Start` and `End` are printed, and the GEC is removed from the Call Stack.
- The registered event listener remains available for future clicks.
- Whenever the user clicks the button, the browser schedules the callback for execution.
- The callback enters the Callback Queue and is executed when the Call Stack is available.

### Why Do We Need a Callback Queue?

Suppose the user clicks the button 6 times.

- Six callback executions can be scheduled.
- These callbacks wait in the Callback Queue.
- The Event Loop allows them to enter the Call Stack one by one when the stack is available.
- Each callback executes and is then removed from the Call Stack.

---

## Behaviour of fetch() – Microtask Queue

Now let's understand why Promise callbacks have a higher priority than timer callbacks.

```js
console.log("Start");

setTimeout(function cbT() {
  console.log("CB Timeout");
}, 5000);

fetch("https://api.netflix.com").then(function cbF() {
  console.log("CB Netflix");
});

// Imagine millions of lines of code here

console.log("End");
```

### Code Explanation

1. `Start` is printed.
2. `setTimeout()` registers `cbT` with the timer API.
3. `fetch()` starts an HTTP request and returns a Promise.
4. The `.then()` callback `cbF` is registered to execute when the Promise is fulfilled.
5. The remaining synchronous code executes, and `End` is printed.
6. When the fetch Promise is fulfilled, its `.then()` callback is scheduled in the **Microtask Queue**.
7. When the timer expires, `cbT` is scheduled in the **Callback Queue (Task Queue)**.
8. Once the current synchronous execution finishes, JavaScript processes the Microtask Queue before moving to the next task from the Callback Queue.

**Assuming both callbacks are ready after the synchronous code finishes, the output is:**

```text
Start
End
CB Netflix
CB Timeout
```

<text color="secondary" size="xs">Note: The actual timing depends on the network response, timer expiration and execution of synchronous code. The order above assumes both callbacks are ready before the Event Loop processes them.</text>

<img width="823" height="433" alt="eventloop6" src="https://github.com/user-attachments/assets/505105d8-2e7f-49a7-af7c-d72b0d4dd762" />


### Microtask Priority Visualization




---

## What Enters the Microtask Queue?

The Microtask Queue contains high-priority microtasks.

### Examples

1. **Promise Callbacks**
   - `.then()`
   - `.catch()`
   - `.finally()`

2. **Mutation Observer**
   - Observes changes in the DOM tree.
   - Executes its callback when relevant DOM mutations are detected.

### Callback Queue vs Microtask Queue

| Microtask Queue | Callback Queue (Task Queue) |
|---|---|
| Promise callbacks | `setTimeout()` callbacks |
| `queueMicrotask()` | `setInterval()` callbacks |
| Mutation Observer callbacks | DOM event callbacks |

**Important Points:**

- Microtasks are processed before the next task from the Callback Queue.
- JavaScript processes microtasks until the Microtask Queue becomes empty.
- If microtasks continuously create more microtasks, tasks in the Callback Queue may not get a chance to execute.
- This situation is called **Starvation**.

---

## Some Important Questions

### 1. When does the Event Loop actually start?

- The Event Loop is part of the JavaScript runtime environment.
- It continuously coordinates the execution of tasks and callbacks.
- It checks whether JavaScript can process the next queued task.

### 2. Are only asynchronous callback functions registered in the Web API environment?

- Yes, callbacks associated with asynchronous browser operations are registered or scheduled through the relevant runtime APIs.
- Synchronous callbacks passed to methods like `map()`, `filter()` and `reduce()` are called directly during the execution of those methods.
- They do not go through the Callback Queue or Microtask Queue.

### 3. Does the Web API environment store only the callback function?

- Browser APIs retain the callback or its registration information as needed.
- When an asynchronous operation completes, its callback is scheduled in the appropriate queue.
- Event listeners remain registered until they are removed or the relevant element or document is discarded.

### 4. What happens if setTimeout() has a delay of 0 milliseconds?

```js
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

console.log("End");

// Output:
// Start
// End
// Timer
```

- A `0ms` delay does not mean the callback executes immediately.
- The callback must wait until the current synchronous code finishes.
- It also has to wait for its turn in the task queue.
- Therefore, a `0ms` timer can execute much later if the Call Stack is busy.

**Remember:** There are trust issues with `setTimeout()`! 😅

---

## Observation of Event Loop, Callback Queue & Microtask Queue (GIFs)

These animations help visualize how JavaScript handles synchronous code, asynchronous callbacks and microtasks.
<img width="880" height="495" alt="microtask" src="https://github.com/user-attachments/assets/11acdb7f-3e61-48fe-9751-71fdfb7bbc2e" />

<img width="880" height="495" alt="microtask1" src="https://github.com/user-attachments/assets/b7da597d-2fbe-4d60-be14-01590933fef6" />
<img width="880" height="495" alt="microtask2" src="https://github.com/user-attachments/assets/703f3f58-1652-4417-8e38-ff1bea4df4fd" />
<img width="880" height="495" alt="microtask3" src="https://github.com/user-attachments/assets/9c56b011-69c3-49bc-95a0-40daa0267274" />
<img width="880" height="495" alt="microtask4" src="https://github.com/user-attachments/assets/826ac09d-e5f4-437c-a7bc-f7fff85df0b2" />
<img width="880" height="495" alt="microtask6" src="https://github.com/user-attachments/assets/39c1852f-5ef3-47f2-b1b5-550671a1df7a" />






---

## Key Takeaways

- JavaScript is a synchronous, single-threaded language (in its usual execution model).
- Browser Web APIs provide additional capabilities to JavaScript.
- The Call Stack executes JavaScript code.
- The Callback Queue stores callbacks waiting to be executed as tasks.
- The Microtask Queue stores Promise callbacks and other microtasks.
- The Event Loop coordinates the execution of queued callbacks.
- Microtasks are processed before the next task from the Callback Queue.
- `setTimeout(fn, 0)` does not guarantee immediate execution.
- Long-running synchronous code blocks the main thread.

---


