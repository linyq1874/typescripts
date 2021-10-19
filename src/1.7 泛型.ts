/**
 * 1.7 泛型
 */

import 'jquery';

// 1.7.1 泛型的基本用法

// 泛型允许开发者创造一些适用于多种类型的模块，这种类型可以由使用者来定义，从而使得模块更灵活
// 泛型可以用于函数、类、接口和类型别名

function makeArray<T>(arg: T): T[] {
    return [arg];
}

// 调用一个定义了泛型的函数、接口、类的时候，需要声明泛型类型
makeArray<string>('hello');
makeArray<number>(100);
// 也可以借助 TypeScript 的类型推断
makeArray('test');

// 声明泛型类型的数量要和定义匹配
// makeArray<string, number>('test'); // error

// 你可以一次定义多个泛型
function packageData<T, U>(data: T, baseData: U) {
    return {
        data,
        baseData,
    };
}

// 泛型允许定义默认值
interface IAjaxData<T = {}> {
    errno: number;
    errmsg?: string;
    data: T;
}
function ajax<T = {}>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
        $.ajax(url).then((result: IAjaxData<T>) => {
            if (result.errno === 0) {
                resolve(result.data);
            } else {
                reject(new Error(result.errmsg));
            }
        });
    });
}

// 有默认值之后在使用的时候可以不必显式声明泛型类型
ajax('localhost');

ajax<{
    name: string;
    age: number;
}>('localhost').then(data => {
    console.log(data.name);
    console.log(data.age);
});



// 1.7.2 泛型约束
// 泛型约束用于限制用户传入的泛型类型，必须具备某些指定的属性

function formatNews<T extends {
    title: string;
    url: string;
}>(data: T[]) {
    return data.reduce((html, item) => `${html}<div class="news-item"><h1><a href="${item.url}">${item.title}</a></h1></div>`, '');
}

formatNews<{
    title: string;
    url: string;
    desc: string
}>([]); // error，没有 title 和 url 属性
