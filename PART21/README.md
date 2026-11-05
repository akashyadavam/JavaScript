# Episode 21: Promises in JavaScript

> Promises are used to handle asynchronous operations in JavaScript.

## Introduction to Promises

Before Promises, callbacks were commonly used to manage asynchronous operations.

However, callbacks introduced two major problems:

1. Inversion of Control
2. Callback Hell

Promises were introduced to provide a better way to handle asynchronous operations and their dependencies.

Let's understand how things worked before Promises and how Promises solve these problems.

---

## 1. Understanding the Problem with Callbacks

Consider an e-commerce application.

A user has added some items to the cart:

```js
const cart = ["shoes", "pants", "kurta"];
```

Now we need to perform two asynchronous operations:

1. Create an Order.
2. Proceed to Payment.

### Without Callbacks

```js
const orderId = createOrder(cart);

proceedToPayment(orderId);
```

**Problem:**

- Both operations are asynchronous.
- `proceedToPayment()` depends on the successful completion of `createOrder()`.
- We cannot assume that `orderId` will be available immediately.

### Using Callbacks (Before Promises)

```js
createOrder(cart, function () {
  proceedToPayment(orderId);
});
```

- We pass a callback function to `createOrder()`.
- `createOrder()` is responsible for executing the callback after creating the order.
- This creates the problem of **Inversion of Control** because we depend on another function to execute our callback correctly.

### How Can We Fix This?

**Answer: Using Promises!**

---

## 2. Understanding Promises

Instead of passing a callback function to another function, we can make the asynchronous function return a Promise.

```js
const promiseRef = createOrder(cart);

promiseRef.then(function (orderId) {
  proceedToPayment(orderId);
});
```

### How Does It Work?

1. `createOrder(cart)` starts the order creation process.
2. It immediately returns a Promise object.
3. The Promise is initially in the `pending` state.
4. JavaScript continues executing the remaining code without waiting.
5. We attach a callback to the Promise using `.then()`.
6. When the order is successfully created, the Promise becomes fulfilled with the `orderId`.
7. The attached callback executes and receives the `orderId`.
8. `proceedToPayment(orderId)` is called.

### Understanding the Promise Object

We can think of a Promise as a container for a future value.

Internally, a Promise maintains:

- **Promise State:** Current state of the Promise.
- **Promise Result:** The value with which the Promise is fulfilled or the reason for rejection.

Initially:

```text
Promise {
  state: "pending",
  result: undefined
}
```

After successful completion:

```text
Promise {
  state: "fulfilled",
  result: orderId
}
```

After failure:

```text
Promise {
  state: "rejected",
  result: error
}
```

<text color="secondary" size="xs">Conceptual representation only. These are internal Promise details, not ordinary properties that can be directly accessed or modified.</text>

**Important:** A Promise does not initially contain an `undefined` value that later gets replaced. Its internal state and result change when the asynchronous operation settles.

---

## 3. Callback vs Promise

### Callback Approach

```js
createOrder(cart, function () {
  proceedToPayment();
});
```

- We pass a function to another function.
- The other function controls when the callback executes.
- This creates Inversion of Control.

### Promise Approach

```js
const promiseRef = createOrder(cart);

promiseRef.then(function (orderId) {
  proceedToPayment(orderId);
});
```

- We attach a callback to the Promise using `.then()`.
- The Promise manages its eventual result.
- The attached fulfillment handler is called when the Promise fulfills.
- A Promise settles only once: it cannot change from fulfilled to rejected or vice versa.

**Important Difference:**

- Callback approach: We pass a function and depend on another function to execute it.
- Promise approach: We attach a handler to a Promise and react to its eventual result.

Promises help solve the Inversion of Control problem by providing a standardized way to observe asynchronous results.

---

## 4. Real Promise Example Using fetch()

`fetch()` is a Web API used to make HTTP requests.

It returns a Promise.

Let's fetch data from a public GitHub API:

```js
const URL = "https://api.github.com/users/alok722";

const user = fetch(URL);

console.log(user);
```

**Output (initially):**

```text
Promise { <pending> }
```

### Observations

- `fetch()` starts an HTTP request.
- It immediately returns a Promise.
- The Promise is initially in the pending state.
- JavaScript does not wait for the server response.
- Once the response is available, the Promise becomes fulfilled with a Response object.

**Important:** `fetch()` generally fulfills when an HTTP response is received, even if the server returns an HTTP error status such as 404 or 500. Network failures and certain request errors can reject the Promise.

### Promise States

A Promise can be in one of three states:

| State | Meaning |
|---|---|
| Pending | Initial state; operation is still in progress |
| Fulfilled | Operation completed successfully |
| Rejected | Operation failed |

A Promise can settle only once, either by becoming fulfilled or rejected.

---

## 5. Attaching a Callback Using .then()

We can attach a fulfillment handler to the Promise using `.then()`.

```js
const URL = "https://api.github.com/users/alok722";

const user = fetch(URL);

user.then(function (data) {
  console.log(data);
});
```

### How Does It Work?

- `fetch()` returns a Promise.
- `.then()` attaches a callback to that Promise.
- When the Promise fulfills, the callback executes.
- The callback receives the fulfilled value, which in this case is a Response object.

**This is how we work with Promises in JavaScript!**

### Extracting JSON Data from the Response

The Response object does not directly contain the parsed JavaScript object.

We can use `.json()` to read and parse the response body.

```js
const URL = "https://api.github.com/users/akashyadavam";

fetch(URL)
  .then(function (response) {
    if (!response.ok) {
      throw new Error("HTTP Error: " + response.status);
    }

    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.log(error);
  });
```

- `response.ok` checks whether the HTTP status is successful.
- `response.json()` returns another Promise.
- The next `.then()` receives the parsed JSON data.
- `.catch()` handles errors in the Promise chain.

---

## 6. Important Properties of Promises

### Promises Are Immutable After Settlement

- Once a Promise is fulfilled or rejected, its state cannot change.
- A fulfilled Promise cannot later become rejected.
- A rejected Promise cannot later become fulfilled.
- Its settled result cannot be changed by directly modifying the Promise object.

**Remember:** The Promise's state is immutable after settlement. However, an object stored as its fulfillment value can still be mutable.

---

## 7. Interview Guide: What is a Promise?

**Question: What is a Promise in JavaScript?**

A Promise is an object representing the eventual completion or failure of an asynchronous operation.

Other ways to understand it:

- A Promise is a placeholder for a future value.
- It represents the result of an asynchronous operation.
- It helps us manage asynchronous code without deeply nested callbacks.

**One-line Interview Answer:**

A Promise is an object representing the eventual completion or failure of an asynchronous operation and its resulting value.

---

## 8. Promises Solve Callback Hell Using Promise Chaining

We have already understood how Promises help solve Inversion of Control.

But what about the second problem: **Callback Hell?**

### Callback Hell Example

Consider the following e-commerce operations:

1. Create Order.
2. Proceed to Payment.
3. Show Order Summary.
4. Update Wallet Balance.

Each operation depends on the successful completion of the previous operation.

**Using Callbacks:**

```js
createOrder(cart, function (orderId) {
  proceedToPayment(orderId, function (paymentInfo) {
    showOrderSummary(paymentInfo, function (balance) {
      updateWalletBalance(balance);
    });
  });
});
```

**Problem:**

- The code becomes deeply nested.
- It becomes difficult to read and maintain.
- This structure is known as Callback Hell or Pyramid of Doom.

### Solution: Promise Chaining

Promises solve this problem using `.then()` chaining.

```js
createOrder(cart)
  .then(function (orderId) {
    return proceedToPayment(orderId);
  })
  .then(function (paymentInfo) {
    return showOrderSummary(paymentInfo);
  })
  .then(function (balance) {
    return updateWalletBalance(balance);
  });
```

### How Does Promise Chaining Work?

1. `createOrder(cart)` returns a Promise.
2. The first `.then()` receives the `orderId`.
3. `proceedToPayment(orderId)` returns another Promise.
4. The next `.then()` waits for that Promise to settle.
5. The same process continues with `showOrderSummary()`.
6. Finally, `updateWalletBalance()` executes after the previous operation completes successfully.

This makes asynchronous code cleaner and easier to maintain.

---

## 9. Common Pitfall: Forgetting to Return a Promise

One of the most common mistakes while writing Promise chains is forgetting to return the Promise from a `.then()` callback.

### Incorrect Approach

```js
createOrder(cart)
  .then(function (orderId) {
    proceedToPayment(orderId);
  })
  .then(function (paymentInfo) {
    showOrderSummary(paymentInfo);
  })
  .then(function (balance) {
    updateWalletBalance(balance);
  });
```

**Problem:**

- We are not returning the Promise from `proceedToPayment()`.
- Therefore, the next `.then()` does not wait for that payment operation.
- Its callback receives `undefined` unless the previous handler explicitly returns another value.

### Correct Approach

```js
createOrder(cart)
  .then(function (orderId) {
    return proceedToPayment(orderId);
  })
  .then(function (paymentInfo) {
    return showOrderSummary(paymentInfo);
  })
  .then(function (balance) {
    return updateWalletBalance(balance);
  });
```

**Remember:**

The value or Promise returned from one `.then()` callback becomes the result available to the next `.then()`.

- If a Promise is returned, the next `.then()` waits for it to settle.
- If a normal value is returned, the next `.then()` receives that value.
- If nothing is returned, the next `.then()` receives `undefined`.

### Promise Chaining Using Arrow Functions

We can make the code shorter using Arrow Functions:

```js
createOrder(cart)
  .then((orderId) => proceedToPayment(orderId))
  .then((paymentInfo) => showOrderSummary(paymentInfo))
  .then((balance) => updateWalletBalance(balance));
```

Here, the implicit return of each arrow function returns the Promise.

---

## Key Takeaways

- Promises are used to handle asynchronous operations.
- A Promise is a placeholder for a future value.
- A Promise has three states: Pending, Fulfilled and Rejected.
- A Promise settles only once.
- `fetch()` is a Web API that returns a Promise.
- `.then()` attaches a fulfillment handler to a Promise.
- Promises help solve the Inversion of Control problem.
- Promise Chaining helps avoid Callback Hell.
- Always return a Promise when the next operation depends on its completion.
- `.catch()` can be used to handle errors in a Promise chain.

---
