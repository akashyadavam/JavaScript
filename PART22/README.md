# Episode 22: Creating a Promise, Chaining & Error Handling

In this episode, we will learn how to create Promises, handle errors using `.catch()`, and chain multiple asynchronous operations using `.then()`.

## What We Will Learn

- Creating a Promise using `new Promise()`
- Understanding Promise states
- Handling errors using `.catch()`
- Promise Chaining
- Returning values and Promises from `.then()`
- Handling errors at different levels using multiple `.catch()` blocks

---

## 1. Creating a Promise – Producer & Consumer

A Promise has two main parts:

- **Producer:** Creates and returns a Promise.
- **Consumer:** Receives and handles the Promise.

### Consumer Part

```js
const cart = ["shoes", "pants", "kurta"];

const promise = createOrder(cart);

promise.then(function (orderId) {
  proceedToPayment(orderId);
});
```

- `createOrder(cart)` is expected to return a Promise.
- `.then()` handles successful fulfillment.
- The callback receives the `orderId` and proceeds to payment.

### Producer Part

JavaScript provides a built-in `Promise` constructor to create Promises.

```js
function createOrder(cart) {
  const promise = new Promise(function (resolve, reject) {

    // Step 1: Validate Cart
    if (!validateCart(cart)) {
      const err = new Error("Cart is not Valid");
      reject(err);
      return;
    }

    // Step 2: Insert order into DB (Assumption)
    const orderId = "12345";

    // Step 3: Success Scenario
    if (orderId) {
      resolve(orderId);
    }

  });

  return promise;
}
```

**Important Points:**

- `new Promise()` creates a Promise object.
- The function passed to it is called the **Executor Function**.
- The Executor Function executes immediately.
- JavaScript provides two functions: `resolve` and `reject`.
- `resolve(value)` fulfills the Promise.
- `reject(error)` rejects the Promise.
- Finally, we return the Promise to the Consumer.

**Mock Logic:**
1. Validate the cart.
2. Insert the order into the database.
3. Generate and return an `orderId`.

---

## 2. Understanding Promise State – Pending

Consider this example:

```js
const cart = ["shoes", "pants", "kurta"];

const promise = createOrder(cart);

console.log(promise);

promise.then(function (orderId) {
  proceedToPayment(orderId);
});
```

**Why might we see `Promise { <pending> }`?**

A Promise has three states:

| State | Meaning |
|---|---|
| Pending | Initial state; operation is not settled yet |
| Fulfilled | Operation completed successfully |
| Rejected | Operation failed |

If `createOrder()` performs an asynchronous operation, such as a database request, it can return a pending Promise before the operation finishes.

Once the operation completes, the Promise becomes fulfilled or rejected.

**Important:** In our earlier mock implementation, `resolve()` is called synchronously. Therefore, the Promise may already be fulfilled when `console.log()` runs. `Promise { <pending> }` is not guaranteed in every implementation.

---

## 3. Error Handling Using .catch()

What happens when an operation fails and the Promise gets rejected?

We use `.catch()` to handle the error.

```js
const cart = ["shoes", "pants", "kurta"];

createOrder(cart)
  .then(function (orderId) {
    // Success handling
    proceedToPayment(orderId);
  })
  .catch(function (err) {
    // Failure handling
    console.log(err);
  });
```

### Explanation

- `.then()` handles successful fulfillment.
- If `createOrder()` rejects the Promise, the success callback is skipped.
- Execution moves to the nearest following rejection handler, `.catch()`.
- The error is received as an argument.

**Remember:** `.catch()` is used to handle Promise rejections and errors thrown inside earlier Promise handlers.

---

## 4. Promise Chaining

Suppose we have an e-commerce application with these operations:

1. Create an order.
2. Proceed to payment.
3. Display payment information.

We want these operations to execute one after another.

This is where **Promise Chaining** comes in.

### Example

```js
const cart = ["shoes", "pants", "kurta"];

createOrder(cart)
  .then(function (orderId) {
    console.log(orderId);
    return orderId;
  })
  .then(function (orderId) {
    return proceedToPayment(orderId);
  })
  .then(function (paymentInfo) {
    console.log(paymentInfo);
  })
  .catch(function (err) {
    console.log(err);
  });
```

### Explanation

**First `.then()`**

```js
.then(function (orderId) {
  console.log(orderId);
  return orderId;
})
```

- Receives the `orderId`.
- Prints it.
- Returns the ID so the next `.then()` can use it.

**Second `.then()`**

```js
.then(function (orderId) {
  return proceedToPayment(orderId);
})
```

- Receives the returned `orderId`.
- Calls `proceedToPayment()`.
- Returns its Promise so the next `.then()` waits for it.

**Third `.then()`**

```js
.then(function (paymentInfo) {
  console.log(paymentInfo);
})
```

- Receives the resolved value from `proceedToPayment()`.
- Displays the payment information.

### Implementing proceedToPayment()

For demonstration, we will create another Promise.

```js
function proceedToPayment(orderId) {
  return new Promise(function (resolve, reject) {
    resolve("Payment Successful");
  });
}
```

**Key Concept:** Whatever a `.then()` callback returns becomes the result for the next `.then()`.

- If it returns a normal value, the next `.then()` receives that value.
- If it returns a Promise, the next `.then()` waits for that Promise to settle.

---

## 5. Error Handling at Different Levels – Multiple .catch()

What if we want the execution to continue even if an earlier Promise fails?

We can place `.catch()` at a particular point in the chain.

```js
createOrder(cart)
  .then(function (orderId) {
    console.log(orderId);
    return orderId;
  })
  .catch(function (err) {
    console.log("Order Error:", err.message);
  })
  .then(function (orderId) {
    return proceedToPayment(orderId);
  })
  .then(function (paymentInfo) {
    console.log(paymentInfo);
  });
```

### How Does It Work?

- If `createOrder()` fails, execution moves to `.catch()`.
- The `.catch()` handles the error.
- If the `.catch()` completes normally without throwing or returning a rejected Promise, the chain becomes fulfilled again.
- The next `.then()` executes.

**Important:** If the first `.catch()` handles an error, the next `.then()` may receive `undefined` because the catch did not return an order ID.

### Multiple .catch() Blocks

We can also use multiple `.catch()` blocks.

```js
createOrder(cart)
  .then(function (orderId) {
    return proceedToPayment(orderId);
  })
  .catch(function (err) {
    console.log("Order or Payment Error:", err.message);
  })
  .then(function (paymentInfo) {
    console.log(paymentInfo);
  })
  .catch(function (err) {
    console.log("Final Error:", err.message);
  });
```

Each `.catch()` handles rejections from the Promise chain before it, until that point.

**Remember:**
- A `.catch()` handles an error and, if it completes normally, allows the chain to continue.
- If a `.catch()` throws an error or returns a rejected Promise, the next `.catch()` can handle it.
- A `.catch()` does not automatically stop the entire chain.

---

## 6. Important Points to Remember

| Concept | Meaning |
|---|---|
| `new Promise()` | Creates a Promise |
| `resolve()` | Fulfills a Promise |
| `reject()` | Rejects a Promise |
| `.then()` | Handles fulfillment |
| `.catch()` | Handles rejection |
| Promise Chaining | Connects multiple Promise operations |
| `return value` | Passes a value to the next `.then()` |
| `return promise` | Makes the next `.then()` wait for that Promise |

**Common Mistakes:**

1. Forgetting to return a Promise from a `.then()` callback breaks the intended chain.
2. Forgetting `return` after `reject()` can allow remaining code to execute.
3. A `.catch()` can recover from an error, so later `.then()` callbacks may execute.
4. Placing a semicolon after `.catch()` ends the chain; do not place one if more `.then()` calls are intended.

---

## 7. Quick Revision

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
    return "Next Step";
  })
  .then(function (value) {
    console.log(value);
  })
  .catch(function (err) {
    console.log(err.message);
  });
```

**Output:**
```text
Data received
Next Step
```

**Final Takeaways:**

- Producer creates and returns a Promise.
- Consumer handles it using `.then()` and `.catch()`.
- Promise chaining connects multiple asynchronous operations.
- Return values flow from one `.then()` to the next.
- `.catch()` handles errors and can recover the Promise chain.

> Promise Chaining makes asynchronous code cleaner, readable, and easier to manage.

---
v=U74BJcr8NeQ&list=PLlasXeu85E9eWOpw9jxHOQyGMRiBZ60aX&index=4)

[Watch on YouTube – Namaste JavaScript](https://www.youtube.com/watch?v=U74BJcr8NeQ)
