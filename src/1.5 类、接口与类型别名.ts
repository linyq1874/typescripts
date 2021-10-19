/**
 * 1.5 类、接口与类型别名
 */

// 1.5.1 类

// 1.5.1.1 类的基本语法
// 类的语法和 es 的类规范基本一致，不同点之一是增加了 private、public、protected、readonly 等修饰符，以及可选类成员

// import 'jquery';

class A {
    constructor(_a: number) {
        this._a = _a; // 类成员如果没有在类定义时初始化，就必须在 constructor 中赋值，否则会报错
    }
    public readonly type = 'a';
    private _a: number;
    hasC?: boolean;
    c?() {
        return 'c';
    }
    get a() {
        return this._a;
    }
    static checkA(objA: A) {
        return objA.a === Math.trunc(objA.a);
    }
}

let ca = new A(100);
ca.c && ca.c();

// 修饰符和readonly还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁。
class Animal {
    // public name: string;
    public constructor(public name) {
        // this.name = name;
    }
}


// 1.5.1.2 抽象类
// 抽象类可以定义一些交给子类去实现的抽象成员

abstract class AbsCheck {
    abstract check(): boolean;
    abstract isAbs: boolean;
}
// new AClassA(); // error 抽象类不允许直接实例化

class CheckClass extends AbsCheck {
    constructor(x: number) {
        super(); // 派生类必须包含 super
        this.x = x;
    }
    isAbs = false; // 子类必须实现抽象类的 abstract 成员
    x: number;
    check() { // 子类必须实现抽象类的 abstract 成员
        return this.x > 5;
    }
}
new CheckClass(1);

// 特殊情况：抽象类继承抽象类，可以不必实现抽象成员
abstract class AbsCheck2 extends AbsCheck { }



// 1.5.2 接口

// 1.5.2.1 接口的基本语法
// 语法是 interface InterfaceName { ... }
// 可以定义可选或只读成员

interface IA {
    readonly type: 'a';
    _a?: number; // 接口允许定义
    a(): number;
}

// 定义函数
interface IFunc {
    (a: number, b: number, c: number): number;
}

// 定义数组（注意不是元组）
interface IArr {
    0: boolean;
    1: string;
}
const arr_i: IArr = [true, 'test'];

// 1.5.2.2 继承
// 接口和类可以互相继承

interface ICheck extends CheckClass {
    // ...
}

interface ICheck2 extends ICheck {
    // ...
}

// 类继承接口使用 implements 关键字，必须实现接口定义的所有成员
class checkB implements IA {
    constructor(a: number) {
        this._a = a;
    }
    readonly type = 'a';
    _a: number;
    a() {
        return this._a;
    }
}

// 1.5.2.3 索引签名
// 类、接口和类型别名都可以定义索引签名，但在接口上定义的情况更普遍
// 它可以定义一些允许扩展属性的对象，但会约束值的类型
// 索引签名只允许为字符串或数字（目前的版本暂时不支持 symbol 作为索引签名）

interface stringObj {
    [key: string]: string;
    // a: 'a'; // ok
    // b: 1; // error
}

let strO: stringObj = {};
strO.test = 'test';
strO.foo = 'foo';
strO.a = '111';
strO.b = '123';

interface stringArr {
    [key: number]: string;
}

let strA: stringArr = [];
strA[0] = 'a';

// 索引签名也可以用于定义一些只读对象，禁止用户扩展属性
interface staticStringArr {
    readonly [key: number]: string;
}
let strB: staticStringArr = ['a'];
// strB[0] = 'b'; // error
// strB[1] = 'b';




// 1.5.3 类型别名 type

// 1.5.3.1 类型别名的基本语法
// 类型别名和接口都不会输出到编译结果
// 语法是 type TypeName = TypeDefinition
// 同样可以定义可选或只读成员

type StrOrNum = number | string;
type TA = {
    readonly type: 'a';
    _a?: number;
    a(): number;
};

// 接口和类也可以继承类型别名（这种时候实际上是把类型别名当作了接口来使用，规则和继承接口一致）
class CTA implements TA {
    readonly type = 'a';
    a() {
        return 0;
    }
}
interface ITA extends TA {
    // ...
}

// 1.5.3.2 类型别名和接口的区别

// 1、接口定义用于定义对象、数组和函数，而类型别名主要用于定义类型集合
// 2、接口主要通过继承来扩展，相对而言，类型别名的扩展手段更丰富
// 3、类型别名可以指向简单类型、字面量类型或元组类型，接口不可以
// 4、声明同名接口会合并成员，而重复声明类型别名会报错

interface ICombine {
    a: string;
}

interface ICombine {
    b: string;
}

interface ICombine {
    c: string;
}

const combine: ICombine = {
    a: 'a',
    b: 'b',
    c: 'c',
};

type TCombine = { a: string };
// type TCombine = { b: string }; // error
// type TCombine = { c: string }; // error
