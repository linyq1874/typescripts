/**
 * 1.3 类型推断和类型断言
 */

import 'jquery';

// 1.3.1 简单类型推断
// 声明语句中，将简单类型赋值给一个变量，TypeScript 将推断变量为相应的简单类型

let str = 'any string';
let num = 1;
let bool = true;



// 1.3.2 函数返回值推断
// TypeScript 会根据 return 语句推断函数的返回值类型，如果没有定义 return 语句，TypeScript 默认认为函数的返回值为 void

const split = function (s: string) {
    return s.split('');
}

function thisIsVoid() { }

function voidOrArray(str?: string) {
    return str ? split(str) : thisIsVoid();
}

function getFalsy(type: string) {
    switch (type) {
        case 'string':
            return '';
        case 'number':
            return 0;
        case 'boolean':
            return false;
        case 'void':
        case 'undefined':
            return;
        case 'null':
            return null;
        default:
            return NaN;
    }
}



// 1.3.3 数组的类型推断

// TypeScript 不会将数组类型推断为元组
const arr_num = [1, 2, 3];
arr_num.push(0);
const arr_str = ['a', 'b', 'c'];
arr_str.push('d');

// 当多个数组成员属于不同的类型时，TypeScript 会将数组成员推断为联合类型
const arr_complex = [1, 'a', true];
arr_complex[3] = 3;
arr_complex[4] = 'b';
arr_complex[5] = false;



// 1.3.4 对象的类型推断

// TypeScript 会根据赋值的对象生成推断类型

const obj1 = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
};



// 1.3.5 类型断言

// 前面已经提到过两种类型断言的形式
let unknownObj: unknown = 1;
(unknownObj as number) *= 2;
(<string>unknownObj) += 'test';

// 类型断言并不是一定会成功的，TypeScript 会对断言进行一定的验证

let objA: {
    a: number,
} = { a: 1 };

// (objA as { b: number }).b = 2; // error 直接断言一个不兼容的类型会报错


// 类型推断作用
const oBtn: HTMLElement = document.querySelector('button');
oBtn.addEventListener('click', handleClick, false);

function handleClick(e: MouseEvent) {
    console.log('button', e);

    const tar = e.target;
    // const tar = e.target as HTMLElement;

    // const tagName = tar.tagName;
}
