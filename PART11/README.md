#  Episode 11: setTimeout + Closures Interview Question

> **Time, tide and JavaScript wait for none.** ⏳

## 1. setTimeout + Closure

```js
function x() {
    var i = 1;

    setTimeout(function () {
        console.log(i);
    }, 3000);

    console.log("Namaste Javascript");
}

x();
```

**Output:**
```text
Namaste Javascript
1  // After approximately 3 seconds
```

### How does it work?

- `setTimeout()` callback ko approximately 3000ms baad execute karne ke liye schedule karta hai. Ye JavaScript ko wait nahi karwata.
- `console.log("Namaste Javascript")` immediately execute hota hai.
- Callback function ek **closure** banata hai, isliye use `i` ki value access karne ke liye lexical environment available rehta hai.
- Timer complete hone ke baad callback task queue mein aata hai aur call stack free hone par execute hota hai.

---

## 2. Interview Question: Print 1 to 5 with a Delay

**Question:** `1` ko 1 second baad, `2` ko 2 seconds baad, aur aise hi `5` ko 5 seconds baad print karo.

### ❌ Approach 1: Using `var`

```js
function x() {
    for (var i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, i * 1000);
    }

    console.log("Namaste Javascript");
}

x();
```

**Output:**
```text
Namaste Javascript
6
6
6
6
6
```

### Why does it print `6` five times?

- `var` is **function-scoped**, so loop ki sabhi iterations same `i` variable share karti hain.
- Har callback closure ke through usi variable ko access karta hai, alag-alag values ko nahi.
- Loop complete hone par `i` ki value `6` ho jaati hai.
- Jab callbacks execute hote hain, sabhi `i` ki current value `6` print karte hain.

**Important:** `setTimeout` ka delay callback ko schedule karta hai; woh loop ko pause nahi karta.

---

## 3.  Solution 1: Using `let`

```js
function x() {
    for (let i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, i * 1000);
    }

    console.log("Namaste Javascript");
}

x();
```

**Output:**
```text
Namaste Javascript
1  // After 1 second
2  // After 2 seconds
3  // After 3 seconds
4  // After 4 seconds
5  // After 5 seconds
```

### Why does `let` work?

- `let` is **block-scoped**.
- `for` loop mein har iteration ke liye `i` ki separate binding hoti hai.
- Har callback apni iteration wali `i` ko closure ke through access karta hai.

---

## 4.  Solution 2: Using `var` (Without `let`)

Agar interviewer specifically `var` use karne ko kahe, toh ek extra function bana sakte hain.

```js
function x() {
    for (var i = 1; i <= 5; i++) {
        function close(i) {
            setTimeout(function () {
                console.log(i);
            }, i * 1000);
        }

        close(i);
    }

    console.log("Namaste Javascript");
}

x();
```

**Output:**
```text
Namaste Javascript
1  // After 1 second
2  // After 2 seconds
3  // After 3 seconds
4  // After 4 seconds
5  // After 5 seconds
```

### Why does this work?

- Har iteration mein `close(i)` call hota hai.
- `close(i)` ke parameter `i` ki har function call mein separate local binding hoti hai.
- Callback us local `i` ko closure ke through remember karta hai.
- Isliye callbacks ko `1, 2, 3, 4, 5` milta hai, na ki shared loop variable ki final value `6`.

---

##  Quick Revision

| Concept | Key Point |
|---|---|
| `setTimeout()` | Callback ko delay ke baad schedule karta hai; execution block nahi karta |
| Closure | Function apne lexical environment ke variables access kar sakta hai |
| `var` in loop | Sabhi callbacks same loop variable share karte hain |
| `let` in loop | Har iteration ki separate binding hoti hai |
| Extra function | `var` use karke bhi har callback ke liye separate value preserve kar sakte hain |

