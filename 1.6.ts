/**
 * 1.6 枚举
 */

import 'jquery';

// 1.6.1 枚举的定义

// 枚举使用 enum 关键字，用于限制某个变量的值只能是有限个特定的常量
// 虽然 js 中没办法定义枚举，但在日常开发中其实经常会用到枚举，例如一个 http 请求的 method 就是一个枚举，css 中也有一些枚举类型的属性，例如 display

enum display {
    none,
    block,
    inline,
    'inline-block',
    // ...
}

// 枚举值默认是数字类型，会从 0 开始累加，你也可以自己定义枚举的值
enum display1 {
    none = -1,
    block = 0,
    inline = 0.5,
    'inline-block',
}

// 枚举值也可以是字符串，甚至混合数字和字符串（不推荐）
enum display2 {
    block = 'block',
    inline = 0.5,
    'inline-block',
}

// 枚举值还可以指向其它的枚举 key，以及可以生成数字或字符串的表达式
enum display3 {
    none = display1.none,
    block = display2.block + '3',
    inline = Math.pow(none + 2, 2),
    'inline-block' = 'inline-block'.length,
}



// 1.6.2 枚举的反向映射

// 当枚举的值为数值时，经过编译后的枚举对象存在反向映射，可以通过值检索到属性

let none = display.none;
let keyOfNone = display[none];


// 1.6.3 常量枚举

// 常量枚举适用于那些运行阶段不需要再依赖的枚举类型，在编译阶段将被删除，可以避免占用更多的资源

const enum display4 {
    none,
    block,
    inline,
    'inline-block',
}

let displayNone = display4.none;
