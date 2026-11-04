# Episode 16: JS Engine Exposed, Google's V8 Architecture

## JavaScript Runtime Environment (JRE)

- JavaScript runs almost everywhere, from browsers and smartphones to servers and smart devices.
- This is possible because of the **JavaScript Runtime Environment (JRE)**.

### What is JRE?

- JRE is like a container that provides everything required to execute JavaScript code.
- A JavaScript Runtime Environment generally consists of:
  - JavaScript Engine
  - Web APIs / Runtime APIs
  - Call Stack
  - Callback Queue (Task Queue)
  - Microtask Queue
  - Event Loop

- The JavaScript Engine is the heart of the runtime environment.
- A browser can execute JavaScript because it provides a JavaScript Runtime Environment.

<img width="819" height="425" alt="jsengine" src="https://github.com/user-attachments/assets/4eddc5be-1217-472c-a8f8-5d4d6b71a9a4" />


---

## ECMAScript and JavaScript Engines

- **ECMAScript** is the standard specification that defines how JavaScript should behave.
- Different JavaScript engines implement this specification.
- Every engine tries to execute JavaScript code efficiently.

### Some Popular JavaScript Engines

| JavaScript Engine | Used In |
|---|---|
| V8 | Google Chrome, Node.js, and other environments |
| SpiderMonkey | Mozilla Firefox |
| JavaScriptCore | Safari |
| Chakra | Legacy Microsoft Edge and Internet Explorer-era environments |

- SpiderMonkey was the first JavaScript engine, developed by Brendan Eich.
- V8 is Google's open-source JavaScript engine.

---

## What is a JavaScript Engine?

- A JavaScript Engine is not a physical machine.
- It is software, generally written in low-level languages such as C++, that takes JavaScript code and executes it.
- Modern engines can compile JavaScript into machine code to improve performance.

### Three Major Stages of JavaScript Engine Execution

1. Parsing
2. Compilation
3. Execution

---

## 1. Parsing

- Parsing is the process of converting source code into a structure that the JavaScript Engine can understand.
- First, the source code is broken down into smaller units called **Tokens**.

Example:

```js
let a = 7;
```

The tokens are:

```text
let
a
=
7
;
```

### Abstract Syntax Tree (AST)

- The parser takes these tokens and generates an **Abstract Syntax Tree (AST)**.
- AST represents the structure and meaning of the JavaScript code in a tree-like format.
- It contains information about declarations, expressions, statements and other code structures.

You can visualize ASTs using:

[AST Explorer](https://astexplorer.net/)

---

## 2. Compilation

- JavaScript uses **Just-In-Time (JIT) Compilation** in modern engines.
- It combines the benefits of interpretation and compilation.
- Interpretation and compilation can work together during runtime.

### Interpreter

- An interpreter processes code and generates executable instructions.
- In V8, the interpreter is called **Ignition**.
- Ignition generates and executes Bytecode.

### Compiler

- A compiler translates code into optimized machine code.
- During execution, the engine collects information about how the code behaves.
- Frequently executed code can be optimized to improve performance.

### JIT Compilation

- JIT stands for **Just-In-Time Compilation**.
- Code can initially be executed using bytecode.
- The engine monitors execution and identifies frequently executed code.
- It can then optimize that code and generate machine code.

**Does JavaScript really compile?**

The answer is a loud **YES!**

Modern JavaScript engines use both interpretation and compilation techniques.

Further Reading:

- [You Don't Know JS – What's in an Interpretation?](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch1.md#whats-in-an-interpretation)
- [Stanford – JavaScript Overview](https://web.stanford.edu/class/cs98si/slides/overview.html)
- [JavaScript: Interpreted or Compiled?](https://blog.greenroots.info/javascript-interpreted-or-compiled-the-debate-is-over-ckb092cv302mtl6s17t14hq1j)

---

## 3. Execution

The JavaScript Engine requires memory management and execution mechanisms to run code.

### Memory Heap

- The Memory Heap is the place where objects and other dynamically allocated data are stored.
- Memory is allocated and managed by the JavaScript Engine.

### Call Stack

- The Call Stack manages Execution Contexts.
- It keeps track of which function is currently executing.
- It follows the **LIFO (Last In, First Out)** principle.

### Garbage Collection

- JavaScript automatically manages memory.
- The Garbage Collector identifies objects that are no longer reachable and reclaims their memory.
- One of the garbage collection techniques used in JavaScript engines is **Mark and Sweep**.

### Mark and Sweep Algorithm

1. **Mark:** The Garbage Collector starts from reachable objects (roots) and marks all objects that can be accessed.
2. **Sweep:** Objects that are not marked are considered unreachable, so their memory can be reclaimed.

<img width="819" height="425" alt="jsengine" src="https://github.com/user-attachments/assets/0a5dc1c1-3a84-4a56-b378-a90c517f34a8" />

### JavaScript Engine Animation

<img width="918" height="478" alt="jsenginegif" src="https://github.com/user-attachments/assets/b3c5a6a8-fdbd-4e1e-a857-2fbe852a47eb" />


---

## Google's V8 Engine Architecture

Different companies develop JavaScript engines and continuously improve their performance.

Google's V8 Engine is one of the most popular JavaScript engines.

### Important Components of V8

| Component | Responsibility |
|---|---|
| Ignition | Interpreter that generates and executes Bytecode |
| TurboFan | Optimizing compiler that generates optimized machine code |
| Orinoco | Garbage collection system |

### V8 Execution Flow

1. JavaScript source code enters the V8 Engine.
2. The parser generates an Abstract Syntax Tree (AST).
3. Ignition generates Bytecode from the AST.
4. Ignition executes the Bytecode.
5. V8 collects runtime feedback while the code executes.
6. TurboFan can optimize frequently executed code and generate machine code.
7. The optimized machine code improves execution performance.

### V8 Architecture Diagram

<img width="640" height="480" alt="jsengine" src="https://github.com/user-attachments/assets/e8491311-9adf-40ff-a003-d74e43ec963d" />



---

## Key Takeaways

- JRE provides the environment required to execute JavaScript.
- ECMAScript is the standard specification followed by JavaScript engines.
- A JavaScript Engine is software, not a physical machine.
- Parsing converts source code into tokens and then an AST.
- AST represents the structure of JavaScript code.
- Modern JavaScript engines use JIT compilation techniques.
- Ignition is V8's interpreter.
- TurboFan is V8's optimizing compiler.
- Orinoco is V8's garbage collection system.
- Memory Heap stores dynamically allocated data.
- Call Stack manages Execution Contexts.
- Mark and Sweep helps the Garbage Collector reclaim unreachable memory.

---
