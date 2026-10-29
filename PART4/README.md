#  Episode 4: Functions and Variable Environments

## 1. Example

```js
var x = 1;

a();
b();

console.log(x); // 1

function a() {
    var x = 10;
    console.log(x); // 10
}

function b() {
    var x = 100;
    console.log(x); // 100
}
```

### Output

```text
10
100
1
```

### Key Points

- Functions can be called before their declarations because of **hoisting**.
- Each function call creates its own **Execution Context**.
- Each function has its own local variable `x`.
- The global variable `x` remains `1`; the local variables do not change it.

---

## 2. Code Flow: Execution Context

### Step 1: Global Execution Context (GEC)

- JavaScript creates the Global Execution Context when the program starts.
- The GEC is pushed onto the **Call Stack**.
- During the Memory Creation Phase:
  - `x` is initialized with `undefined`.
  - Functions `a` and `b` store their complete function code.

**Call Stack:**

```text
|       |
|       |
|  GEC  |
---------
```

### Step 2: Global Code Execution

- `x = 1` assigns `1` to the global variable.
- `a()` is called, creating a new Execution Context.

**Call Stack:**

```text
|       |
|  a()  |
|  GEC  |
---------
```

### Step 3: Function `a()` Executes

- Local `x` is initialized with `undefined` during memory creation.
- `x = 10` assigns `10` to the local variable.
- `console.log(x)` prints `10`.
- After the function returns, its Execution Context is removed from the Call Stack.

**Call Stack after `a()` returns:**

```text
|       |
|  GEC  |
---------
```

### Step 4: Function `b()` Executes

- A new Execution Context is created for `b()`.
- Its local `x` receives the value `100`.
- `console.log(x)` prints `100`.
- After `b()` returns, its Execution Context is removed.

**Call Stack after `b()` returns:**

```text
|       |
|  GEC  |
---------
```

### Step 5: Program Finishes

- `console.log(x)` accesses the global variable and prints `1`.
- The Global Execution Context is removed when the program finishes and the runtime cleans up the execution environment.

---

## 3. Variable Environment

A **Variable Environment** stores variables and their values within an Execution Context.

| Scope | Variable `x` |
|---|---:|
| Global | `1` |
| Function `a()` | `10` |
| Function `b()` | `100` |

**Remember:** Variables declared with `var` inside a function are local to that function. Each function has its own Execution Context and separate local variables.

---

<img width="1256" height="528" alt="Screenshot (1279)" src="https://github.com/user-attachments/assets/8e3779e1-afd0-4cea-bbae-a5370205ea45" />
<img width="1334" height="703" alt="Screenshot (1280)" src="https://github.com/user-attachments/assets/2d390408-377c-4905-8131-10b338f3267d" />
<img width="1284" height="552" alt="Screenshot (1281)" src="https://github.com/user-attachments/assets/9b9c6bb4-d750-4609-9459-ee6815aed433" />



