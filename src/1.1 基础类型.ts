/**
 * 1.1 基础类型
 */
import 'jquery'; // 使文件形成一个模块
// 1.1.1 基本类型

const str: string = 'abc';
const num: number = 0
const bool: boolean = true
const nul: null = null
const undef: undefined = void 0
// 要使用 symbol 类型，必须在 tsconfig.json 中将 target 设置为 "es2015" 或更高
const syb: symbol = Symbol('test')
// 要使用 bigint 类型，必须在 tsconfig.json 中将 target 设置为 "esnext"
const bign: bigint = 1n



// 注意：使用构造函数 String 创造的对象不是基本类型字符串：
// const createByNewString: string = new String('s');
const createByNewString1: String = new String('s');
const createByNewString2: string = String('s');




// 1.1.2 ts 的一些特殊的“基本”类型

// 1.1.2.1 any
// 当一个变量被声明为 any 类型，意味着可以赋给它任意值

let a: any = {}
a = 1 // ok
a = '1' // ok
a = [true, Symbol()] // ok
a++
// 可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。

// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
let something;
something = 'seven';
something = 7;



// 1.1.2.2 unknown
// 和 any 类型相似，unknown 类型也可以表示任意类型。但对 unknown 类型执行除了赋值之外任何操作或运算，都必须先进行类型断言，否则会报错

let b: unknown = {}
b = null
b = 1
  // b += 1; // error
  ; (b as number) += 1 // 使用 as 关键字进行类型断言
// let b1: number = b; // unknown 类型只能赋值给 any 或 unknown 类型的变量
let b1: number = <number>b // 使用“尖括号语法”进行类型断言

// 1.1.2.3 void

// void 主要用于 function，表示没有任何返回值
function foo(): void { }


// 1.1.2.4 never
// never 表示一个永远不会到达的值

// never 通常用于定义一个永远不会执行完成的函数的返回值
function bar(): never {
  throw new Error('oops')
}

function bar1(): never {
  while (true) { }
}

function bar2(): never {
  return bar()
}

// 也可以用于泛型类型
new Promise<never>((resolve, reject) => {
  console.log('haha')
  resolve(undefined);
  // resolve(100); // error，只能传入 never 或 undefined
  resolve(bar()); // ok
})
let neverArr: Array<never> = [bar(), bar1(), bar2()]
// neverArr.push(void 0); // error
// neverArr.push(null); // error

// 那些运算后变成空集的高级类型也会被认为是 never
let IamNever: string & number
let IamNeverToo: Exclude<string, string>



// 1.1.3 字面量类型
// 字面量可以直接作为类型

let literal: 1 = 1
// literal = 2; // error
let literal1: 'a' | 'b' | 'c' = 'a'
// literal1 = 'd'

// 1.1.4 数组

const arr: number[] = [1, 2, 3]
const arr1: Array<string> = ['a', 'b', 'c']

// 1.1.5 元组
// 元组不但限制了数组成员的类型，也限制了数组成员的数量

let tuple: [boolean, string] = [true, 'A']
tuple = [false, 'B']
// tuple = ['C', true]; // error
// tuple = [false, 'C', 'c']; // error
// tuple[2] = true; // error
tuple.push(true) // 注意！目前版本的 TypeScript，数组方法可以绕过元组的类型检查
// tuple.push(100); // error，只能插入 boolean 或 string

// 1.1.6 对象

// object 类型和空对象 {} 是等价的，在赋值时允许额外的属性
let obj: object = { a: 1 } // 等价于 let obj: {} = { a: 1 };
// obj.a = 2; // error，操作类型声明中的额外属性会报错

let person: {
  name: string
  age: number
} = {
  name: 'wang',
  age: 40
}
person.name = 'lee'
person.age = 30
// person.gender = 'female'; // error
person = {
  name: 'zhang',
  age: 20,
  gender: 'male' // error
} as {
  name: string
  age: number
}
