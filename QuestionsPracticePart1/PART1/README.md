
// ==========================================
// 1. VARIABLES: var, let, const
// ==========================================

// -------- VAR --------
var varExample = 10;
var varExample = 20; // Redeclaration allowed
console.log(varExample); // | Output: 20

// -------- LET --------
let letExample;       // Declaration without explicit value
letExample = 10;      // Assignment
letExample = 20;      // Reassignment allowed
console.log(letExample); // | Output: 20

// letExample redeclare nahi kar sakte:
// let letExample = 30;
// | Error: SyntaxError: Identifier 'letExample' has already been declared


// -------- CONST --------
const constExample = 100;
console.log(constExample); // | Output: 100

// constExample = 200;
// | Error: TypeError: Assignment to constant variable.

// const constExample2;
// | Error: SyntaxError: Missing initializer in const declaration


// ==========================================
// 2. SCOPE: BLOCK SCOPE & FUNCTION SCOPE
// ==========================================

// -------- BLOCK SCOPE: let & const --------
{
    let blockLet = 10;
    const blockConst = 20;
    var blockVar = 30;

    console.log(blockLet);   // | Output: 10
    console.log(blockConst); // | Output: 20
    console.log(blockVar);   // | Output: 30
}

console.log(blockVar); // | Output: 30 (var is not block scoped)

// console.log(blockLet);
// | Error: ReferenceError: blockLet is not defined

// console.log(blockConst);
// | Error: ReferenceError: blockConst is not defined


// -------- FUNCTION SCOPE: var --------
function functionScopeDemo() {
    var functionVar = 50;
    console.log(functionVar); // | Output: 50
}

functionScopeDemo();

// console.log(functionVar);
// | Error: ReferenceError: functionVar is not defined


// ==========================================
// 3. HOISTING: var, let, const & function
// ==========================================

// -------- VAR HOISTING --------
console.log(hoistedVar); // | Output: undefined

var hoistedVar = 100;

console.log(hoistedVar); // | Output: 100


// -------- LET HOISTING --------

// console.log(hoistedLet);
// | Error: ReferenceError: Cannot access 'hoistedLet'
// | before initialization

let hoistedLet = 200;


// -------- CONST HOISTING --------

// console.log(hoistedConst);
// | Error: ReferenceError: Cannot access 'hoistedConst'
// | before initialization

const hoistedConst = 300;


// -------- FUNCTION HOISTING --------

hoistedFunction(); // | Output: Function called successfully

function hoistedFunction() {
    console.log("Function called successfully");
}


// ==========================================
// 4. VAR, LET & CONST IN WINDOW OBJECT
// ==========================================

// Browser ke normal classic <script> mein:

var windowVar = 10;
let windowLet = 20;
const windowConst = 30;

if (typeof window !== "undefined") {
    console.log(window.windowVar);   // | Output: 10
    console.log(window.windowLet);   // | Output: undefined
    console.log(window.windowConst); // | Output: undefined
}


// ==========================================
// 5. PRIMITIVE DATA TYPES (7)
// ==========================================

let stringType = "JavaScript";
let numberType = 100;
let bigintType = 12345678901234567890n;
let booleanType = true;
let undefinedType = undefined;
let symbolType = Symbol("id");
let nullType = null;


// ==========================================
// 6. BIGINT: PRECISE LARGE NUMBERS
// ==========================================

const bigNumber1 = 9007199254740993n;
const bigNumber2 = 2n;

console.log(bigNumber1 + bigNumber2);
// | Output: 9007199254740995n

console.log(9007199254740993);
// | Output: 9007199254740992 (Precision lost)

// BigInt aur Number ko directly add nahi kar sakte:

// console.log(bigNumber1 + 2);
// | Error: TypeError: Cannot mix BigInt and other types


// ==========================================
// 7. DYNAMIC TYPING IN JAVASCRIPT
// ==========================================

let dynamicValue = "Hello";

console.log(typeof dynamicValue); // | Output: string

dynamicValue = 100;
console.log(typeof dynamicValue); // | Output: number

dynamicValue = true;
console.log(typeof dynamicValue); // | Output: boolean

dynamicValue = { name: "JavaScript" };
console.log(typeof dynamicValue); // | Output: object


// ==========================================
// 8. TYPEOF OPERATOR
// ==========================================

console.log(typeof "Hello");     // | Output: string
console.log(typeof 100);         // | Output: number
console.log(typeof 100n);        // | Output: bigint
console.log(typeof true);        // | Output: boolean
console.log(typeof undefined);   // | Output: undefined

console.log(typeof null);        // | Output: object (Special case)
console.log(typeof NaN);         // | Output: number

console.log(typeof Symbol("id")); // | Output: symbol

console.log(typeof hoistedFunction); // | Output: function

console.log(typeof {});          // | Output: object
console.log(typeof []);          // | Output: object


// ==========================================
// 9. SYMBOL: UNIQUE IDENTIFIERS
// ==========================================

const symbol1 = Symbol("id");
const symbol2 = Symbol("id");

console.log(symbol1 === symbol2);
// | Output: false (Every Symbol is unique)


// ==========================================
// 10. REFERENCE TYPE: OBJECT
// ==========================================

const referenceObject = {
    name: "JavaScript",
    version: "ES6"
};

const referenceArray = [10, 20, 30];

console.log(typeof referenceObject); // | Output: object
console.log(typeof referenceArray);  // | Output: object


// ==========================================
// 11. TYPE COERCION (DYNAMIC TYPING)
// ==========================================

console.log("5" + 2); // | Output: "52"
console.log("5" - 2); // | Output: 3
