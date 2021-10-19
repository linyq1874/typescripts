/**
 * 1.2 函数
 */
import 'jquery';
// 1.2.1 函数声明

function cutString(str: string, len: number): string {
    // return len; // error，返回值必须和声明的类型一致
    return str.slice(0, len);
}
cutString('hello world!', 10);
// cutString('hello world!');
// cutString('hello world!', 10, 2);



// 1.2.2 函数表达式


const cutStr: (str: string, len: number) => string
    = (str: string, len: number): string => str.slice(0, len);

// interface ICutStr {
//     (str: string, len: number): string
// }
// const cutStr: ICutStr
//     = (str: string, len: number): string => str.slice(0, len);

// const cutStr: ICutStr
//     = (str: string, len: number, isStr: boolean): string => str.slice(0, len);



// 1.2.3 this 虚拟参数

// HTMLAnchorElement 接口表示超链接元素，并提供一些特别的属性和方法（除了那些继承自普通 HTMLElement对象接口的之外）以用于操作这些元素的布局和显示。
function clickHandler(
    this: HTMLAnchorElement,
    ev: MouseEventInit
) {
    console.log('here', this, this.target, ev);

    if (ev.clientX as number > 100) {
        this.target = '_blank';
    }
}
document.querySelector('a').addEventListener('click', clickHandler, false)
// $('#nav a').on('click', clickHandler);



// 1.2.4 可选参数

function optional(a: number, b?: number): number {
    return b ? a + b : a * a;
}

// 必选参数必须在可选参数之前
// function optional1(a?: number, b: number): number {
//     return a ? a + b : b * b;
// }

// TypeScript 会将添加了默认值的参数识别为可选参数，此时就不受「可选参数必须接在必需参数后面」的限制了
function optional2(a: number = 1, b: number): number {
    return a ? a + b : b * b;
}


// 可选参数和默认值参数的顺序没有限制，但都必须位于 rest 参数之前
function optional3(a: number, b: number = 100, c?: number, ...args: number[]): void {
    console.log(`${a}-${b}-${c}`);
}
function optional4(a: number, b?: number, c: number = 100, ...args: number[]): void {
    console.log(`${a}-${b}-${c}`);
}

// 可选参数和给定默认值，在调用方式上没有分别，但是函数内部逻辑实现上，给定默认值的方式通常具有更好的可读性，在这里比较推荐后者



// 1.2.5 函数重载
// !面向对象的多态
// 函数重载用于返回值可能有多种类型，且返回值类型和参数类型强关联的情况
// 所有的函数重载必须写在一起，并且紧跟着真实的函数定义
// TypeScript 会自上而下地解析这些重载

function overload(operate: 'numberToString', source: number): string;
function overload(operate: 'stringToNumber', source: string): number;
function overload(operate: 'toBoolean', source: string | number): boolean;
function overload(operate: 'numberToString' | 'stringToNumber' | 'toBoolean', source: string | number): string | number | boolean {
    if (operate === 'numberToString') {
        return source;
    } else if (operate === 'stringToNumber') {
        return Number(source);
    } else {
        return !!source;
    }
}

const ov_a: string = overload('numberToString', 100);
const ov_b: number = overload('stringToNumber', '100');
const ov_c: boolean = overload('toBoolean', '100');
const ov_d: boolean = overload('toBoolean', 100);
