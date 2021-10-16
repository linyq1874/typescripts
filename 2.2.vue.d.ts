// 2.2.3.2 扩展 Vue 的类成员

// 注意：由于会在根作用域 import Vue 组件，所以必须和单文件组件声明放在不同的 .d.ts，否则二者会起冲突
// 所有必须在根作用域 import 组件的情况，都建议放到单独的声明文件

import Vue from 'vue'; // 此行必须！
 
declare module 'vue/types/vue' {
    // 扩展 Vue 接口
    // 使用方式：在 Vue 实例中直接 this.$routeTo(path)
    interface Vue {
        $routeTo(path: string): void;
    }

    // 扩展 VueConstructor 接口
    // 使用方式：调用 Vue 类的静态成员 Vue.$routeTo(path)
    interface VueConstructor {
        $routeTo(path: string): void;
    }
}

// 扩展 Vue 组件的配置参数
// 使用方式：在创建组件时可以增加额外的配置参数 new Vue({ myOption: 'Hello' });
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        myOption?: string
    }
}
