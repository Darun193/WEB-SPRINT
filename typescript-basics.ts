//типы
let userName: string = "Darya";

let age: number = 20;

let isLearning: boolean = true;


// Массивы с типами
const studentScores: number[] = [10, 20, 30];

const studentNames: string[] = ["Darya", "Anna", "Alex"];

//типы параметров функций
function double(value: number) {
    return value * 2;
}


//тип возвращаемого значения функции
function double1(value: number): number {
    return value * 2;
}

function createGreeting(name: string): string {
    return `Hello, ${name}!`;
}

function isAdult(age: number): boolean {
    return age >= 18;
}


//void для функций, которые ничего не возвращают
function showMessage(message: string): void {
    console.log(message);
}


//функция с несколькими параметрами разных типов
function describeUser(name: string, age: number, isActive: boolean): string {
    return `${name} is ${age} years old. Active: ${isActive}`;
}


//описание объекта по типу
type User = {
    readonly id: number;
    name: string;
    age: number;
    isActive: boolean;
    email?: string;
};

//пример
const user: User = {
    id: 1,
    name: "Darya",
    age: 20,
    isActive: true,
};

console.log(user);



type Product = {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
};


const product: Product = {
    id: 1,
    name: "Laptop",
    price: 1200,
    inStock: true,
};


//описание объекта через interface
interface Customer {
    id: number;
    name: string;
    isActive: boolean;
}

const customer: Customer = {
    id: 1,
    name: "Darya",
    isActive: true,
};



interface Lesson {
    id: number;
    title: string;
    duration: number;
    completed: boolean;
}

const lessonn: Lesson = {
    id: 1,
    title: "TypeScript Basics",
    duration: 60,
    completed: false,
};

// union тип
type RecognitionStatus = "correct" | "wrong" | "unreviewed";

//литеральный тип
let recognitionStatus: RecognitionStatus = "correct";

recognitionStatus = "wrong";
recognitionStatus = "unreviewed";





interface Recognition {
    id: number;
    value: string;
    confidence: number;
    status: RecognitionStatus;
}

const recognition: Recognition = {
    id: 1,
    value: "MSKU 907032 1",
    confidence: 0.97,
    status: "correct",
};



let userId: number | string;

userId = 123;
userId = "abc-123";

console.log(userId)



type RecognitionStatus1 = "correct" | "wrong" | "unreviewed";

interface Recognition {
    id: number;
    value: string;
    confidence: number;
    status: RecognitionStatus;
}


const apiRecognition: Recognition = {
    id: 1,
    value: "MSKU 907032 1",
    confidence: 0.97,
    status: "correct",
};


function printValue(value: string | number): void {
    if (typeof value === "string") {
        console.log(value.toUpperCase());
    } else {
        console.log(value.toFixed(2));
    }
}



let data: any = "hello";

data = 123;

data = true;

console.log(data);