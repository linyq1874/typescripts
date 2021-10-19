/**
 * 2.2 类型声明
 */

// 2.2.2 自定义类型声明

// 2.2.2.1 类型声明

// 自定义类型声明要把文件命名为 *.d.ts，引用自定义类型可以有两种办法：
// 1、在 tsconfig.json 中配置 include，把类型声明文件或文件夹包含进去（推荐）
// 2、使用三斜线指令（不推荐）

// 类型声明要用到 declare 关键字，声明之后的类型可以在项目的任何文件中直接使用

// 声明接口
declare interface IUserdata {
    nickname?: string;
    username?: string;
    id: any; // 虽然 tslint 不会验证 *.d.ts 文件，但还是建议不要过度使用 any
}

declare interface IStringObj {
    [key: string]: string;
}

// 声明类型别名
declare type TDataItem = {
    name: string;
    type: string;
    key: string | symbol;
    value: string | number | boolean | null | undefined;
}

// 声明变量
declare let dataLen: number;

// 下面这个模块你们可能在工作中会经常遇到，这是我自己补全的类型声明
// 可以看到自定义声明之间也是可以互相引用的
declare const monitor: {
    buildLog(b: boolean, s: string): void;
    config: IStringObj;
    data: {
        getBase(): IStringObj;
        getClick(e: Event): void;
        getKeydown(e: Event): void;
        getTrack(): {
            b: string;
            c: number;
            fl: number;
            r: string;
        };
    };
    getClickAndKeydown(e: Event): void;
    getTrack(): typeof monitor;
    log(o: IStringObj, s: string, b?: boolean): void;
    sendLog(s: string): void;
    setConf(o: IStringObj | string, v?: string): typeof monitor;
    setId(...ids: string[]): typeof monitor;
    setProject(p: string): typeof monitor;
    setUrl(p: string): typeof monitor;
    util: {
        getBrowser(): string;
        getContainerId(): string;
        getCount(): number;
        getFlashVer(): number;
        getGuid(): string;
        getHref(): string;
        getLocation(): string;
        getProject(): string;
        getReferrer(): string;
        getSid(): string;
        getText(e: HTMLElement): string;
    };
    version: string;
};

// 声明函数
declare function cutStr(s: string, len: number): string;
declare function cutStr(s: string, len: number, returnSource: true): {
    result: string;
    source: string;
};

// 声明类
declare class Person {
    constructor(name: string);
    say(words: string): this;
    private _age: number;
    get age(): number;
}

// 声明枚举（声明枚举干啥……）
declare enum Gender {
    UNKNOWN,
    MALE,
    FEMALE,
}

// 声明模块（可以用于解决 webpack alias）
declare module 'config' {
    export const config: {
        url: string;
        defaultData?: TDataItem[];
        defaultDataLen?: typeof dataLen;
    };
    export default function(): typeof config;
}


// 2.2.2.2 扩展全局 API 和原生对象

// 扩展全局 API，需要声明对应的全局接口
// 前面提到过，重复声明一个接口，TypeScript 会自动进行合并

// 在 window 上扩展属性
declare interface Window {
    webkitRequestAnimationFrame?(callback: () => void): number;
}

// 下面是我自己整理的 QHPass 的声明，需要扩展到 window

declare interface Window {
    QHPass: {
        init(name: string): void;
        setConfig(key: string, value: any): void;
        getUserInfo(successCallback: (o: IUserdata) => void, failCallback: () => void): void;
        signIn(callback: (o: IUserdata) => void): void;
        signOut(callback: () => void): void;
        signUp(callback: () => void): void;
    };
}

// 在 document 上扩展属性
declare interface Document {
    webkitIsFullScreen?: boolean;
}

// 假如你项目的 TypeScript 版本较低，你可能需要这样扩展 Promise，增加 finally api
declare interface Promise<T> {
    finally<TResult1 = T, TResult2 = never>(onfinally?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null): Promise<TResult1 | TResult2>;
}

// 2.2.3 Vue 相关的声明

// 2.2.3.1 声明 Vue 单文件组件

declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

// 更多声明见 2.2.vue.d.ts
