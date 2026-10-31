# 🚀 Episode 12: Famous Interview Questions ft. Closures

## Q1. What is a Closure in JavaScript?

**Answer:** A closure is a combination of a function and its access to the lexical environment in which it was created.

```js
function outer() {
    var a = 10;

    function inner() {
        console.log(a);
    }

    return inner;
}

outer()(); // 10
```

**Explanation:**
- First `()` calls `outer()` and returns the `inner` function.
- Second `()` executes the returned `inner` function.
- `inner` remembers the lexical environment containing `a`.

---

## Q2. Will the below code still form a closure?

```js
function outer() {
    function inner() {
        console.log(a);
    }

    var a = 10;
    return inner;
}

outer()(); // 10
```

**Answer:** Yes. The inner function retains access to its outer lexical environment. When `inner` executes, `a` has already been assigned the value `10`.

---

## Q3. Does changing `var` to `let` make any difference?

```js
function outer() {
    let a = 10;

    function inner() {
        console.log(a);
    }

    return inner;
}

outer()(); // 10
```

**Answer:** No difference in this example. Both `var` and `let` variables can be accessed through closures.

---

## Q4. Can an inner function access the outer function's arguments?

```js
function outer(str) {
    let a = 10;

    function inner() {
        console.log(a, str);
    }

    return inner;
}

outer("Hello There")(); // 10 "Hello There"
```

**Answer:** Yes. The inner function can access both `a` and `str` through its closure.

---

## Q5. Does `inner` form a closure with `outest` too?

```js
function outest() {
    var c = 20;

    function outer(str) {
        let a = 10;

        function inner() {
            console.log(a, c, str);
        }

        return inner;
    }

    return outer;
}

outest()("Hello There")(); // 10 20 "Hello There"
```

**Answer:** Yes. The inner function can access variables from multiple outer lexical environments through the **scope chain**.

- `a` comes from `outer`.
- `str` is the parameter of `outer`.
- `c` comes from `outest`.

---

## Q6. What is the output? Explain the scope chain.

```js
function outest() {
    var c = 20;

    function outer(str) {
        let a = 10;

        function inner() {
            console.log(a, c, str);
        }

       
