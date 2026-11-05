# Episode 22: Creating a Promise in JavaScript

In the previous episode, we learned how to consume Promises using `.then()`. Now, we will learn how to **create our own Promises using the JavaScript Promise constructor** and return them from a function.

## What We Will Learn

- Consumer and Producer Parts of a Promise
- Creating Promises using `new Promise()`
- Understanding `resolve()` and `reject()`
- Implementing the `createOrder()` function
- Promise execution flow and important points

---

## 1. Consumer Part of a Promise

First, let's revise how we consume a Promise.

```js
const cart = ["shoes", "pants", "kurta"];

// Consumer Part of Promise
const promise = createOrder(cart);

promise.then(function (orderId) {
  proceedToPayment(orderId);
});
```

### Explanation

1. We call `createOrder(cart)` and expect it to return a Promise.
2. We store the returned Promise in the `promise` variable.
3. We use `.then()` to handle successful completion.
4. When the Promise is fulfilled, the callback receives the `orderId`.
5. We pass that ID to `proceedToPayment()`.

**Question:** How do we implement `createOrder()` so that it returns a Promise?

Let's understand the Producer Part.

---

## 2. Producer Part – Creating a Promise

JavaScript provides a built-in `Promise` constructor to create Promises.

### Syntax

```js
const promise = new Promise(function (resolve, reject) {
  // Write our logic here
});
```

### Understanding the Promise Constructor

- `new Promise()` creates a new Promise object.
- It accepts a callback function called the **Executor Function**.
- The Executor Function executes immediately when the Promise is created.
- JavaScript automatically provides two functions to it:
  - `resolve()`
  - `reject()`

These functions help us communicate whether an operation succeeded or failed.

---

## 3. Understanding resolve() and reject()

| Function | Purpose |
|---|---|
| `resolve(value)` | Fulfills the Promise with a value |
| `reject(error)` | Rejects the Promise with a reason |

### resolve()

When an operation is successful, we call `resolve()`.

```js
resolve(orderId);
```

- The Promise becomes fulfilled.
- The value passed to `resolve()` becomes its fulfillment value.
- The Consumer receives this value through `.then()`.

### reject()

When an operation fails, we call `reject()`.

```js
const err = new Error("Cart is not Valid");
reject(err);
```

- The Promise becomes rejected.
- The error becomes its rejection reason.
- The Consumer can handle it using `.catch()`.

**Promise States:**

- `pending` – Initial state.
- `fulfilled` – Operation completed successfully.
- `rejected` – Operation failed.

A Promise can settle only once. Its state cannot change after fulfillment or rejection.

---

## 4. Implementing createOrder() – Producer Part

Now, let's implement the `createOrder()` function.

### Mock Logic

In a real-world application, creating an order involves:

1. Validating the cart.
2. Inserting the order into the database.
3. Getting an `orderId`.

For this example, we assume that `validateCart()` is already defined and the database operation is represented by a fixed order ID.

### Complete Producer Code

```js
function createOrder(cart) {

  // Create a Promise
  const promise = new Promise(function (resolve, reject) {

    // Step 1: Validate Cart
    if (!validateCart(cart)) {

      // Cart is invalid
      const err = new Error("Cart is not Valid");
      reject(err);
    }

    // Step 2: Insert order into DB (Assumption)
    const orderId = "12345";

    // Step 3: Success Scenario
    if (orderId) {
      resolve(orderId);
    }

  });

  // Return the Promise
  return promise;
}
```

### Explanation

**Step 1: Create a Promise**

```js
const promise = new Promise(function (resolve, reject) {
```

We create a Promise and pass an Executor Function. JavaScript automatically provides `resolve` and `reject`.

**Step 2: Validate the Cart**

```js
if (!validateCart(cart)) {
  const err = new Error("Cart is not Valid");
  reject(err);
}
```

If the cart is invalid, we create an Error object and reject the Promise.

**Step 3: Generate Order ID**

```js
const orderId = "12345";
```

We assume the order is successfully inserted into the database and an order ID is returned.

**Step 4: Handle Success**

```js
if (orderId) {
  resolve(orderId);
}
```

If an order ID exists, we fulfill the Promise using `resolve()`.

**Step 5: Return the Promise**

```js
return promise;
```

Finally, we return the Promise so the Consumer can handle its result.

---

## 5. Important Correction: Why Use return After reject()?

In the original code, we wrote:

```js
if (!validateCart(cart)) {
  const err = new Error("Cart is not Valid");
  reject(err);
}

const orderId = "12345";
```

**Problem:** Calling `reject()` does not automatically stop the remaining JavaScript code. The code below it can still execute.

To prevent the success logic from running after validation fails, use `return`.

```js
if (!validateCart(cart)) {
  return reject(new Error("Cart is not Valid"));
}
```

This stops the current function's execution.

Remember: A Promise can settle only once, but calling `resolve()` or `reject()` does not itself stop JavaScript execution.

---

## 6. Complete Producer + Consumer Code

Now, let's combine both parts.

```js
const cart = ["shoes", "pants", "kurta"];

// Consumer Part
const promise = createOrder(cart);

promise
  .then(function (orderId) {
    proceedToPayment(orderId);
  })
  .catch(function (err) {
    console.log(err.message);
  });

// Producer Part
function createOrder(cart) {

  return new Promise(function (resolve, reject) {

    // Validate Cart
    if (!validateCart(cart)) {
      return reject(new Error("Cart is not Valid"));
    }

    // Assume order is inserted into DB
    const orderId = "12345";

    // Success Scenario
    if (orderId) {
      resolve(orderId);
    }

  });

}
```

*Note: `validateCart()` and `proceedToPayment()` are assumed to be defined elsewhere. The database operation is mocked.*

### Execution Flow

**Success Scenario:**

1. `createOrder(cart)` is called.
2. A new Promise is created.
3. The Executor Function runs immediately.
4. Cart validation succeeds.
5. An order ID is generated.
6. `resolve(orderId)` fulfills the Promise.
7. The `.then()` callback executes and proceeds to payment.

**Failure Scenario:**

1. `createOrder(cart)` is called.
2. Cart validation fails.
3. `reject(err)` rejects the Promise.
4. The `.then()` success callback is skipped.
5. The `.catch()` callback handles the error.

---

## 7. Important Points to Remember

- The Executor Function runs synchronously when a Promise is created.
- Creating a Promise does not automatically make the operation asynchronous.
- The Promise object is returned immediately, even if it is still pending.
- `resolve()` fulfills the Promise; `reject()` rejects it.
- `.then()` handles fulfillment; `.catch()` handles rejection.
- Use `return` after `reject()` when you need to stop further execution.

---

## 8. Quick Revision

```js
function getData() {
  return new Promise(function (resolve, reject) {

    const success = true;

    if (success) {
      resolve("Data received");
    } else {
      reject(new Error("Data failed"));
    }

  });
}

getData()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log(err.message);
  });
```

| Concept | Meaning |
|---|---|
| `new Promise()` | Creates a Promise |
| Executor Function | Runs immediately |
| `resolve()` | Success |
| `reject()` | Failure |
| `.then()` | Handles fulfillment |
| `.catch()` | Handles rejection |

**Final Takeaway:**

- **Producer:** Creates a Promise, performs the operation, calls `resolve()` or `reject()`, and returns the Promise.
- **Consumer:** Receives the Promise and handles its result using `.then()` and `.catch()`.

> The Producer creates and returns a Promise, while the Consumer handles its result.
