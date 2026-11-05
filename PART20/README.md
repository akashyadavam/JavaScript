# Episode 20: Callback Hell & Inversion of Control

## Understanding Callbacks

There are two sides of using callbacks in JavaScript:

### 1. Good Part of Callbacks

- Callbacks are extremely useful when writing asynchronous code.
- They allow us to execute a function after an asynchronous operation is completed.
- They help us manage dependencies between asynchronous operations.

### 2. Bad Part of Callbacks

Using callbacks can lead to two major problems:

- **Callback Hell**
- **Inversion of Control**

Understanding these problems is important before learning **Promises**.

---

## JavaScript is Synchronous and Single-Threaded

- JavaScript executes code using a single Call Stack.
- It can execute one piece of JavaScript code at a time on that thread.
- Synchronous code executes line by line without waiting for asynchronous operations.

```js
console.log("Namaste");
console.log("JavaScript");
console.log("Season 2");

// Output:
// Namaste
// JavaScript
// Season 2
```

> **Remember:** Time, tide and JavaScript wait for none!

### What if We Want to Delay Execution?

We can use callbacks with asynchronous APIs such as `setTimeout()`.

```js
console.log("Namaste");

setTimeout(function () {
  console.log("JavaScript");
}, 5000);

console.log("Season 2");

// Output:
// Namaste
// Season 2
// JavaScript
```

- `setTimeout()` registers the callback with the timer API.
- JavaScript does not wait for the timer to finish.
- It continues executing the next synchronous statement.
- Once the timer expires and the callback gets its turn, it executes.

---

## E-commerce Application: Understanding Callback Dependencies

Let's consider an e-commerce application.

A user has added the following items to their cart:

```js
const cart = ["shoes", "pants", "kurta"];
```

Now the user wants to place an order.

There are two important steps:

1. Create an Order.
2. Proceed to Payment.

```js
api.createOrder(cart);
api.proceedToPayment();
```

**Problem:**

- We have a dependency between these two operations.
- Payment should happen only after the order has been successfully created.
- How can we manage this dependency?

### Solution: Using Callbacks

```js
api.createOrder(cart, function () {
  api.proceedToPayment();
});
```

**How does it work?**

- We pass a callback function to `createOrder()`.
- `createOrder()` creates the order.
- After successful order creation, it calls the callback.
- The callback then executes `proceedToPayment()`.

This ensures that payment starts after the order creation callback is invoked.

---

## Callback Hell (Pyramid of Doom)

Now let's make the example more complicated.

Suppose after payment is completed, we want to show the Order Summary.

The Order Summary depends on successful payment.

```js
api.createOrder(cart, function () {
  api.proceedToPayment(function () {
    api.showOrderSummary();
  });
});
```

Now suppose we also want to update the user's wallet after showing the Order Summary.

```js
api.createOrder(cart, function () {
  api.proceedToPayment(function () {
    api.showOrderSummary(function () {
      api.updateWallet();
    });
  });
});
```

### What is Callback Hell?

- When multiple asynchronous operations depend on one another, callbacks can become deeply nested.
- This makes the code difficult to read, understand, debug and maintain.
- Such a nested callback structure is known as **Callback Hell**.
- It is also called the **Pyramid of Doom** because the code starts moving towards the right with every nested callback.

### Visual Representation

```text
Create Order
     |
     v
Proceed to Payment
     |
     v
Show Order Summary
     |
     v
Update Wallet
```

**Problems with Callback Hell:**

- Deeply nested code.
- Difficult to maintain.
- Difficult to debug.
- Poor readability.
- Managing multiple asynchronous dependencies becomes complicated.

---

## Inversion of Control

Now let's understand the second major problem of callbacks.

> **Inversion of Control means losing control over when and how a callback function gets executed because we hand over that responsibility to another function.**

### Example

```js
api.createOrder(cart, function () {
  api.proceedToPayment();
});
```

### What's the Problem?

- We pass our callback function to `createOrder()`.
- We expect `createOrder()` to execute that callback after creating the order.
- But we are depending on `createOrder()` to call our function correctly.

We are basically trusting another function with the responsibility of executing our important code.

### What Can Go Wrong?

Suppose `createOrder()` is implemented incorrectly:

1. It might never call the callback.
2. It might call the callback more than once.
3. It might call the callback at the wrong time.
4. It might not handle errors properly.

This creates a problem because we have handed over control of our callback to another function.

### Why is it Called Inversion of Control?

Normally, we decide when our code should execute.

But when we pass a callback to another function, that function decides when and how to execute it.

This transfer of responsibility is called **Inversion of Control (IoC)**.

---

## How Can We Avoid These Problems?

JavaScript provides **Promises** to handle asynchronous operations in a cleaner and more manageable way.

Promises help us:

- Avoid deeply nested callback structures.
- Manage asynchronous dependencies using `.then()`.
- Handle errors using `.catch()`.
- Maintain better control over asynchronous operation results.

We will explore Promises in the next episode!

---

## Key Takeaways

- Callbacks are important for asynchronous programming.
- Callbacks help manage dependencies between asynchronous operations.
- Callback Hell occurs when callbacks become deeply nested.
- Callback Hell is also known as the Pyramid of Doom.
- Inversion of Control occurs when we hand over the responsibility of executing our callback to another function.
- Promises provide a better way to manage asynchronous operations.

---

## Additional Reading

[Callback Hell – Understanding and Avoiding Callback Hell](http://callbackhell.com/)

---
