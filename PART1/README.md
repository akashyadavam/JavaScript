#  Episode 01: Execution Context in JavaScript

##  What is Execution Context?

- Everything in JavaScript happens inside an **Execution Context**.
- Imagine it as a sealed container inside which JavaScript code runs.
- It is an abstract concept that holds information about the environment in which the current code is being executed.

###  Components of Execution Context

An Execution Context consists of two main components:

1. **Memory Component**
2. **Code Component**

<img width="1398" height="906" alt="Screenshot (1271)" src="https://github.com/user-attachments/assets/ec19a7aa-b69c-4b37-88ce-75b020db740a" />




## 1. 🗂️ Memory Component

- The Memory Component stores variables and functions in **key-value pairs**.
- It is also known as the **Variable Environment**.
- JavaScript allocates memory for variables and functions before executing the code in the execution phase.

## 2. 💻 Code Component

- The Code Component is where JavaScript code is executed **one line at a time**.
- It is also known as the **Thread of Execution**.
- JavaScript executes statements in the order determined by the program's control flow.



##  Important Characteristics of JavaScript

JavaScript is a **Synchronous, Single-Threaded Language**.

### 🔹 Synchronous

- Code generally executes one statement after another in a defined order.
- The next statement normally waits for the current synchronous operation to finish.

### 🔹 Single-Threaded

- JavaScript executes one piece of JavaScript code at a time on a single thread.
- It does not execute two ordinary JavaScript statements simultaneously on that same thread.



##  Quick Revision

| Concept | Meaning |
|---|---|
| Execution Context | Environment in which JavaScript code executes |
| Memory Component | Stores variables and functions |
| Variable Environment | Another name for the memory component |
| Code Component | Executes code one statement at a time |
| Thread of Execution | Another name for the code component |
| Synchronous | Executes synchronous statements in order |
| Single-Threaded | One piece of JavaScript code at a time on the same thread |

---

** Remember:** Every JavaScript program runs within an execution context. Understanding its memory and code components is the foundation for learning the JavaScript execution model.
