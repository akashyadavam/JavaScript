//basic +function+array all questions here 
//all code cover here for questions and soln go to txt file 


// 1. VARIABLES: var, let, const

var a = 10;
var a = 20;
console.log(a); // | 20 (Redeclare allowed)

let b;
b = 10;
b = 20;
console.log(b); // | 20 (Reassign allowed)

// let b = 30; // SyntaxError: Already declared

const c = 100;
console.log(c); // | 100

// c = 200; // TypeError: Assignment to constant variable
// const d;  // SyntaxError: Missing initializer


// 2. SCOPE: Block & Function

{
    let x = 10;
    const y = 20;
    var z = 30;
}
console.log(z); // | 30
// console.log(x); // ReferenceError
// console.log(y); // ReferenceError

function demo() {
    var n = 50;
    console.log(n); // | 50
}
demo();
// console.log(n); // ReferenceError


// 3. HOISTING & TDZ

console.log(v); // | undefined
var v = 100;

// console.log(l); // ReferenceError (TDZ)
let l = 200;

// console.log(k); // ReferenceError (TDZ)
const k = 300;

hello(); // | Hello
function hello() {
    console.log("Hello");
}


// 4. WINDOW OBJECT (Browser Classic Script)

var w = 10;
let wl = 20;
const wc = 30;

console.log(window.w);  // | 10
console.log(window.wl); // | undefined
console.log(window.wc); // | undefined


// 5. PRIMITIVE DATA TYPES (7)

// let str = "JavaScript";
let num = 100;
let big = 12345678901234567890n;
let bool = true;
let und = undefined;
let sym = Symbol("id");
let nul = null;


// 6. BIGINT

const big1 = 9007199254740993n;
const big2 = 2n;

console.log(big1 + big2); // | 9007199254740995n

console.log(9007199254740993); // | 9007199254740992

// big1 + 2; // TypeError: Cannot mix BigInt and Number


// 7. DYNAMIC TYPING

let value = "Hello";
console.log(typeof value); // | string

value = 100;
console.log(typeof value); // | number

value = true;
console.log(typeof value); // | boolean


// 8. TYPEOF OPERATOR

console.log(typeof "Hi");        // | string
console.log(typeof 100);         // | number
console.log(typeof 100n);        // | bigint
console.log(typeof true);        // | boolean
console.log(typeof undefined);   // | undefined
console.log(typeof null);        // | object
console.log(typeof NaN);         // | number
console.log(typeof Symbol());    // | symbol
console.log(typeof hello);       // | function
console.log(typeof []);          // | object
console.log(typeof {});          // | object


// 9. SYMBOL: Unique Values

const s1 = Symbol("id");
const s2 = Symbol("id");

console.log(s1 === s2); // | false


// 10. REFERENCE TYPE

const obj = { name: "JS" };
// const arr = [10, 20, 30];

console.log(typeof obj); // | object
console.log(typeof arr); // | object


// 11. TYPE COERCION

console.log("5" + 2); // | "52"
console.log("5" - 2); // | 3


const user = {};

const id1 = Symbol("id");//alag id banaya same 
const id2 = Symbol("id");//alag id bnaa symbol se alag same name kyon na ho 

user[id1] = 101;
user[id2] = 202;
console.log(user[id1]); // Output: 101
console.log(user[id2]); // Output: 202
// Symbol() ek unique value create karta hai.
// Same description hone par bhi Symbols equal nahi hote.
// Symbol ek primitive data type hai.
// typeof Symbol() ka output "symbol" hota hai.
// Symbol ka use unique object property keys banane mein hota hai.



//array

// 1. IF - ELSE

let age = 20;

if (age >= 18) {
    console.log("Adult"); // | Adult
} else {
    console.log("Minor");
}


// 2. TERNARY OPERATOR

let result = age >= 18 ? "Eligible" : "Not Eligible";

console.log(result); // | Eligible


// 3. SWITCH CASE

let day = 2;

switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday"); // | Tuesday
        break;
    default:
        console.log("Invalid Day");
}


// 4. FOR LOOP

for (let i = 1; i <= 5; i++) {
    console.log(i); // | 1 2 3 4 5
}


// 5. STRING TRAVERSAL

let str = "HELLO";//yaha str.length hota hai 

for (let i = 0; i < str.length; i++) {
    console.log(str[i]); // | H E L L O
}


// 6. ARRAY TRAVERSAL (FOR LOOP)

let arr = [10, 20, 30, 40];

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // | 10 20 30 40
}


// 7. FOR...OF (VALUES)

for (let value of arr) {
    console.log(value); // | 10 20 30 40
}


// 8. FOREACH (ARRAY METHOD)

arr.forEach((value, index) => {//for each mein pahle value dusra  index hota hai hamesha  
    console.log(index, value);
    // | 0 10
    // | 1 20
    // | 2 30
    // | 3 40
});

let user = {
    name: "Akash",
    age: 20,
    city: "Panipat"
};

for (let key in user) {
    console.log(key, user[key]);
}

// Output:
// name Akash
// age 20
// city Panipat

// let str = "CODE";

for (let char of str) {
    console.log(char);
}

// Output:
// C
// O
// D
// E


//function start from here
// 1. Greet User — Parameter: name | Argument: "Sarthak"
function greetUser(name) {
    return `Hello, ${name}!`;
}
console.log(greetUser("Sarthak")); // Hello, Sarthak!


// 2. Add Two Numbers
function addNumbers(a, b) {
    return a + b;
}
console.log(addNumbers(10, 20)); // 30


// 3. Even or Odd — % checks remainder
function checkEvenOdd(num) {
    return num % 2 === 0 ? "Even" : "Odd";
}
console.log(checkEvenOdd(7)); // Odd


// 4. Largest of Two — Equal numbers return same value
function largestTwo(a, b) {
    return a > b ? a : b;
}
console.log(largestTwo(10, 25)); // 25


// 5. Rectangle Area
function calculateArea(length, width) {
    return length * width;
}
console.log(calculateArea(5, 3)); // 15


// 6. Default Parameter — Used when argument is undefined
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}
console.log(greet()); // Hello, Guest!


// 7. Default Quantity
function calculatePrice(price, quantity = 1) {
    return price * quantity;
}
console.log(calculatePrice(500)); // 500


// 8. Arrow Function + Implicit Return — No {} or return needed
const square = num => num * num;
console.log(square(5)); // 25


// 9. Calculator — switch handles multiple cases
function calculateOperator(a, b, operator) {
    switch (operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
        default: return "Invalid operator";
    }
}
console.log(calculateOperator(10, 5, "+")); // 15


// 10. Voting — Early Return stops function immediately
function canVote(age) {
    if (age < 0) return "Invalid age";
    if (age >= 18) return "Eligible to vote";
    return "Not eligible to vote";
}
console.log(canVote(20)); // Eligible to vote


// 11. Rest Parameter — Collects arguments into an array
function sumAll(...numbers) {
    let sum = 0;
    for (let num of numbers) sum += num;
    return sum;
}
console.log(sumAll(1, 2, 3)); // 6


// 12. Largest of Any Numbers — Manual loop
function largestMany(...numbers) {
    if (numbers.length === 0) return undefined;
    let max = numbers[0];
    for (let num of numbers) {
        if (num > max) max = num;
    }
    return max;
}
console.log(largestMany(4, 9, 2, 15)); // 15


// 13. Average — No numbers => undefined
function average(...numbers) {
    if (numbers.length === 0) return undefined;
    return sumAll(...numbers) / numbers.length;
}
console.log(average(10, 20, 30)); // 20


// 14. Function Expression — Function stored in a variable
let multiply = function(a, b) {
    return a * b;
};
console.log(multiply(5, 6)); // 30


// 15. Arrow Function — Shortest syntax
multiply = (a, b) => a * b;
console.log(multiply(5, 6)); // 30


// 16. Positive, Negative or Zero
const checkNumber = num =>
    num > 0 ? "Positive" : num < 0 ? "Negative" : "Zero";

console.log(checkNumber(-5)); // Negative


// 17. Execute Function — Function passed as argument
function execute(fn) {
    fn();
}
function sayHello() {
    console.log("Hello!");
}
execute(sayHello); // Hello!


// 18. Repeat Function — Callback executes multiple times
function repeat(fn, times) {
    for (let i = 0; i < times; i++) fn();
}
repeat(() => console.log("Hi"), 3);
// Hi
// Hi
// Hi


// 19. Callback Calculator — Pass function, not operator
function addCallback(a, b) {
    return a + b;
}
function multiplyCallback(a, b) {
    return a * b;
}
function calculateCallback(a, b, operation) {
    return operation(a, b);
}
console.log(calculateCallback(5, 3, addCallback)); // 8


// 20. Process User — Callback receives name
function processUser(name, callback) {
    return callback(name);
}
const sayHelloUser = name => `Hello, ${name}`;
const sayGoodbye = name => `Goodbye, ${name}`;

console.log(processUser("Aman", sayHelloUser)); // Hello, Aman


// 21. Multiplier Factory — Returns another function
function createMultiplier(multiplier) {
    return num => num * multiplier;
}
const double = createMultiplier(2);
console.log(double(5)); // 10


// 22. Greeter Factory — Closure remembers greeting
function createGreeter(greeting) {
    return name => `${greeting}, ${name}`;
}
const sayNamaste = createGreeter("Namaste");
console.log(sayNamaste("Aman")); // Namaste, Aman


// 23. Pure Function — No external variable modification
function addPure(currentTotal, value) {
    return currentTotal + value;
}
console.log(addPure(10, 5)); // 15
console.log(addPure(10, 5)); // 15 (same input, same output)


// 24. IIFE — Immediately Invoked Function Expression
(function() {
    const message = "Application Started";
    console.log(message);
})();
// Output: Application Started
// Outside message => ReferenceError (not accessible)


// 25. Recursion — Function calls itself
function countdown(n) {
    if (n <= 0) return console.log("Done!"); // Base case
    console.log(n);
    countdown(n - 1);
}
countdown(5);
// 5 4 3 2 1 Done!


// BONUS 1. Recursive Sum
function sumTo(n) {
    if (n <= 0) return 0; // Base case
    return n + sumTo(n - 1);
}
console.log(sumTo(5)); // 15


// BONUS 2. Recursive Power
function power(base, exponent) {
    if (exponent === 0) return 1;
    return base * power(base, exponent - 1);
}
console.log(power(2, 4)); // 16


// BONUS 3. Own forEach — Built-in forEach not used
function forEachElement(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }
}
forEachElement([10, 20, 30], value => console.log(value));
// 10 20 30 




// ==================== ARRAYS ====================

// 1. Create, Access & Update
let fruits = ["Apple", "Banana", "Mango"];

console.log(fruits[0]); // Apple (Index starts from 0)
fruits[1] = "Orange";   // Update element


// 2. Modifying Methods (Original array changes)
let arr = [1, 2, 3, 4];

arr.push(5);       // Add at end
arr.pop();         // Remove from end
arr.unshift(0);    // Add at start
arr.shift();       // Remove from start
arr.splice(1, 2);  // Remove 2 elements from index 1
arr.reverse();     // Reverse original array


// 3. Extracting Methods (Original array unchanged)
let nums = [1, 2, 3, 4, 5];

let part = nums.slice(1, 3); // [2, 3] (End index excluded)


// 4. Sorting
let ages = [20, 5, 100, 30];

ages.sort();           // Default string-based sorting
ages.sort((a, b) => a - b); // Numeric ascending
ages.sort((a, b) => b - a); // Numeric descending


// 5. map() — Returns a new modified array
let prices = [100, 200, 300];

let gstPrices = prices.map(price => price * 1.18);
// [118, 236, 354]


// 6. filter() — Returns elements matching condition
let even = nums.filter(num => num % 2 === 0);
// [2, 4]


// 7. reduce() — Converts array into a single value
let salaries = [10000, 20000, 30000];

let total = salaries.reduce((acc, val) => acc + val, 0);
// 60000 (0 = Initial accumulator value)


// 8. forEach() — Performs action, returns undefined
nums.forEach((value, index) => {
    console.log(index, value);
});


// 9. find(), some(), every()
console.log(nums.find(n => n > 3));  // 4 (First match)
console.log(nums.some(n => n > 4));  // true (At least one)
console.log(nums.every(n => n > 0)); // true (All elements)


// 10. Destructuring & Spread
let colors = ["Red", "Blue", "Green"];

let [first, second] = colors;
// first = Red, second = Blue

let copiedArray = [...colors, "Yellow"];
// Copies array and adds Yellow

// Reverse without modifying original array
function reverseArray(arr) {
    return [...arr].reverse();
}


// ==================== OBJECTS ====================

// 1. Create & Access Properties
let student = {
    name: "Ravi",
    age: 21,
    isEnrolled: true
};

console.log(student.name);       // Dot notation
console.log(student["name"]);    // Bracket notation

student.age = 22;                // Update property
student.course = "JavaScript";   // Add property
student["full name"] = "Ravi Kumar"; // Multi-word key


// 2. Dynamic Property Access
let property = "name";

console.log(student[property]); // Ravi


// 3. Nested Objects
let user = {
    name: "Amit",
    address: {
        city: "Delhi",
        pincode: 110001
    }
};

console.log(user.address.city); // Delhi


// 4. Object Destructuring
let { name, age } = student;

console.log(name, age); // Ravi 22

// Nested destructuring
let {
    address: { city }
} = user;

console.log(city); // Delhi


// 5. Loop Through Objects
for (let key in student) {
    if (Object.hasOwn(student, key)) {
        console.log(key, student[key]);
    }
}


// 6. Object.keys(), values(), entries()
console.log(Object.keys(student));   // All keys
console.log(Object.values(student)); // All values
console.log(Object.entries(student)); // Key-value pairs


// 7. Copy Objects (Shallow Copy)
let copy1 = { ...student };
let copy2 = Object.assign({}, student);

// Both create shallow copies (nested objects are shared).


// 8. Deep Copy (JSON Method)
let deepCopy = JSON.parse(JSON.stringify(user));

// Copies nested plain data.
// Does not preserve functions, undefined, or Symbol values.


// 9. Optional Chaining (?.)
console.log(user?.address?.city);   // Delhi
console.log(user?.profile?.email);  // undefined (No error)


// 10. Computed Properties
let key = "marks";

let report = {
    [key]: 89
};

console.log(report.marks); // 89


// 11. Delete Property
delete student.age;

console.log(student.age); // undefined