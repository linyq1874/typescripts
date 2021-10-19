/**
 * 1.8 高级类型-2
 */

import 'jquery';

// 1.8.1 T[K] 操作符

// T[K] 操作符从一个
interface IUserData {
    name: string;
    mobile: number | string | undefined;
}

// 注意：只能用 T[K] 的形式，使用 T.K 会报错
function getContact(data: IUserData): IUserData['mobile'] {
    return data.mobile;
}



// 1.8.2 typeof 操作符

// typeof 除了作为 JavaScript 的运算符之外，还可以用于编译阶段获取目标元素或属性的类型

// 还是刚才的例子，假如我们不是从类型上，而是直接从对象上获取属性，就需要用到 typeof 操作符
// 因为是直接从对象上获取属性，所以写法可以很随意：typeof data.mobile、typeof data['mobile']、(typeof data)['mobile'] 都可以
function getContact1(data: IUserData): (typeof data)['mobile'] {
    return data.mobile;
}



// 1.8.3 keyof 操作符

// keyof 操作符用于获取一个类型的属性名集合

let userKey: keyof IUserData = 'mobile';

// 如果想要直接从对象上获取属性名集合，要借助 typeof
let userData = {
    name: 'foo',
    age: 12,
};
function getUserProp(key: keyof (typeof userData)) {
    return userData[key];
}



// 1.8.4 实用程序类型

// TypeScript 提供了一些实用程序类型，方便我们进行类型转换
// 在线文档：https://www.typescriptlang.org/docs/handbook/utility-types.html

// 1.8.4.1 Partial<T>
// 将一个类型的所有属性转换为可选

type UserDataPartial = Partial<IUserData>;



// 1.8.4.2 Readonly<T>
// 将一个类型的所有属性转换为只读

type UserDataReadonly = Readonly<IUserData>;



// 1.8.4.3 Record<K, T>
// 表示生成一个属性名集合为 K，属性值为 T 的新类型

type UserDataRecord = Record<'teacher' | 'student', IUserData>;



// 1.8.4.4 Pick<T, K>
// 表示从 T 类型中选取属性集合 K 组成新的类型

type UserDataPick = Pick<IUserData, 'name'>



// 1.8.4.5 Omit<T, K>
// 表示从 T 类型中删除属性集合 K 生成新的类型

type UserDataOmit = Omit<IUserData, 'name'>;



// 1.8.4.6 Exclude<T, U>
// 表示取集合 U 在 T 中的相对补集（差集）

type UserDataExclude = Exclude<keyof IUserData, 'name'>;



// 1.8.4.7 Extract<T, U>
// 表示取集合 T 和 U 的交集

type UserDataExtract = Extract<keyof IUserData, 'name' | 'age'>;



// 1.8.4.8 NonNullable<T>
// 表示从一个类型中剔除 null 和 undefined

type NonNull = NonNullable<string | number | null | undefined>;



// 1.8.4.9 ReturnType<T>
// 表示获取一个函数的返回值类型，如果使用真实函数，要借助 typeof 操作符

type RType = ReturnType<typeof getContact>;



// 1.8.4.10 InstanceType<T>
// 表示获取一个构造函数类型的实例类型

type InsType = InstanceType<typeof String>;



// 1.8.4.11 Required<T>
// 可以认为是 Partial<T> 的反向操作，将所有可选属性都转为必选

type UserDataRequired = Required<UserDataPartial>;



// 1.8.4.12 ThisType<T>
// 用于标记上下文中 this 的类型，必须和 noImplicitThis 选项配合使用
// 我们尝试着利用它来书写一个类似于 Vue 的组件定义：

type Module<D, M> = {
    template?: string;
    data: D,
    methods: M & ThisType<D & M>;
};

const car: Module<{
    x: number;
    y: number;
}, {
    move(): void;
    getPos(): number[];
}> = {
    data: {
        x: 0,
        y: 0,
    },
    methods: { // methods 内部上下文的 this 被指向了新类型 T & D
        move() {
            this.x++;
            this.getPos();
            this.y++;
        },
        getPos() {
            return [this.x, this.y];
        },
    }
}
