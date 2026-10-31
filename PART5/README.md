# 🚀 Episode 5: Shortest JS Program, `window` & `this` Keyword

## 1. Shortest JavaScript Program

- An **empty JavaScript file** is considered the shortest JavaScript program.
- Even an empty file causes the JavaScript engine to create a **Global Execution Context (GEC)**.
- The engine initializes the global environment and prepares the execution context.

## 2. `window` Object

- In browsers, JavaScript creates a global object called **`window`**.
- It provides access to many built-in browser properties, methods and global variables.
- Global `var` declarations and function declarations in classic scripts can become properties of `window`.

## 3. `this` Keyword at the Global Level

- In a browser's classic script, the global-level `this` refers to the `window` object.
- Therefore, at the top level of a classic browser script:

```js
this === window; // true
```

- The global object has different names in different JavaScript environments. For example, Node.js uses `globalThis` to access the global object consistently.

## 4. Example: Global Variables

```js
var x = 10;

console.log(x);        // 10
console.log(this.x);   // 10 (classic browser script)
console.log(window.x); // 10
```

### Output

```text
10
10
10
```

**Explanation:**

- `x` accesses the variable directly.
- `window.x` accesses the corresponding property of the browser's global object.
- In a classic browser script, top-level `this.x` also accesses that property.

> **Note:** This example assumes a classic browser script, not an ES module. ES modules have different top-level `this` behavior.

---

## 🎯 Quick Revision

| Concept | Meaning |
|---|---|
| Shortest JS program | An empty JavaScript file |
| GEC | Global Execution Context |
| `window` | Browser's global object |
| Global `this` | Refers to `window` in a classic browser script |
| `globalThis` | Standard way to access the global object across environments |

---
