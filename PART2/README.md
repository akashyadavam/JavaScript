#  Episode 02: How JS Is Executed & Call Stack

## 1. Global Execution Context (GEC)

- When a JavaScript program runs, a **Global Execution Context** is created.
- It has two phases:
  - **Memory Creation Phase:** Memory is allocated to variables and functions. Variables get `undefined`, while functions store their complete code.
  - **Code Execution Phase:** Code executes line by line and variables receive their actual values.

## 2. Example

var n = 2;

function square(num) {
    var ans = num * num;
    return ans;
}

var square2 = square(n);
var square4 = square(4);


## 3. How Code Executes
<img width="719" height="618" alt="Screenshot (1275)" src="https://github.com/user-attachments/assets/65f76b7c-0411-4646-acfc-9e74657f1ea1" />


### Memory Creation Phase

| Identifier | Initial Value |
|---|---|
| `n` | `undefined` |
| `square` | Complete function code |
| `square2` | `undefined` |
| `square4` | `undefined` |

### Code Execution Phase

- `n = 2` → `n` gets the value `2`.
- `square(n)` → A new Execution Context is created.
  - `num = 2`
  - `ans = 2 * 2 = 4`
  - `return ans` returns `4` and the function's Execution Context is removed.
- `square(4)` → Creates another Execution Context and returns `16`.
- After the program finishes, the Global Execution Context can be removed.
- <img width="809" height="514" alt="Screenshot (1274)" src="https://github.com/user-attachments/assets/8865b341-3252-48c1-9bdc-80898ea1bdb9" />

## 4.  Call Stack

- The **Call Stack** manages the creation and removal of Execution Contexts.
- It keeps track of which function is currently executing and where control should return.
- It follows **LIFO (Last In, First Out)** order.

### Other Names

- Program Stack
- Control Stack
- Runtime Stack
- Execution Context Stack

---

##  Quick Revision

- **GEC:** Created when the JavaScript program starts.
- **Memory Phase:** Allocates memory to variables and functions.
- **Execution Phase:** Executes the code.
- **Function Call:** Creates a new Execution Context.
- **Return:** Returns control to the calling code and finishes the function call.
- **Call Stack:** Manages Execution Contexts in LIFO order.


