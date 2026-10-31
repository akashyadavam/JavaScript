# 🚀 Episode 16: JS Engine Exposed, Google's V8 Architecture

## 1. What is JavaScript Runtime Environment (JRE)?

- JavaScript runs almost everywhere, from smartwatches to robots and browsers.
- This is possible because of the **JavaScript Runtime Environment**.
- JRE is like a container that provides everything required to execute JavaScript code.

### Components of JavaScript Runtime Environment

- JavaScript Engine
- Web APIs / Runtime APIs
- Call Stack
- Callback Queue (Task Queue)
- Microtask Queue
- Event Loop

**Important:** The JavaScript Engine is the heart of the JavaScript Runtime Environment.

A browser can execute JavaScript because it provides a JavaScript Runtime Environment.

<img width="1180" height="629" alt="Screenshot (1298)" src="https://github.com/user-attachments/assets/b9823ce5-3a86-497b-9933-e6a35cbaee30" />


---

## 2. What is ECMAScript?

**ECMAScript (ES)** is the standard specification that defines how JavaScript should behave.

Different JavaScript engines follow this specification to maintain consistency.

### Popular JavaScript Engines

| JavaScript Engine | Used In |
|---|---|
| V8 | Google Chrome, Node.js, Chromium-based browsers |
| SpiderMonkey | Mozilla Firefox |
| JavaScriptCore (JSC) | Safari |
| Chakra | Legacy Microsoft Edge |

**Note:** SpiderMonkey was the first JavaScript engine, created by Brendan Eich. Chakra was used in the older Microsoft Edge (EdgeHTML), not the modern Chromium-based Edge.

---

## 3. What is a JavaScript Engine?

- A JavaScript Engine is not a physical machine.
- It is software written in low-level languages such as C++.
- It takes high-level JavaScript code and converts it into machine-executable instructions.

### Three Major Stages of JavaScript Engine

1. Parsing
2. Compilation
3. Execution


### 1. Parsing

Parsing is the process of analyzing JavaScript code and converting it into an **Abstract Syntax Tree (AST)**.

**Step 1: Tokenization**

The source code is broken into smaller units called tokens.

Example:

```js id="p8jz43"
let a = 7;
```

Tokens:

```text id="0p9d7s"
let
a
=
7
;
```

**Step 2: Syntax Analysis**

- The parser checks whether the code follows JavaScript syntax rules.
- It creates an Abstract Syntax Tree (AST).
- AST represents the structure of the source code in a tree format.

  <img width="958" height="655" alt="Screenshot (1299)" src="https://github.com/user-attachments/assets/d5e9c477-f083-425f-bad0-cd9265296025" />


You can visualize AST using:

[AST Explorer](https://astexplorer.net/)

---

### 2. Compilation

JavaScript uses **Just-In-Time (JIT) Compilation** in modern engines.

JIT combines interpretation and compilation techniques.

**Interpreter:**
- Takes the parsed code / AST.
- Produces executable instructions, often bytecode.
- Executes the code.

**Compiler:**
- Identifies frequently executed code.
- Optimizes that code during runtime.
- Produces optimized machine code where beneficial.

### Does JavaScript really compile?

**YES!**

Modern JavaScript engines use both interpretation and compilation techniques.

- JavaScript was traditionally described as an interpreted language.
- Modern engines use JIT compilation and runtime optimization.
- This provides a balance between fast startup and optimized execution.

**Remember:** Compilation and execution can work together during runtime.

Useful Resources:

- [You Don't Know JS – What's in an Interpretation?](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch1.md#whats-in-an-interpretation)
- [Stanford – JavaScript Overview](https://web.stanford.edu/class/cs98si/slides/overview.html)
- [
