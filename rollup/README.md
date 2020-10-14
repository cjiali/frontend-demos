# [Rollup](https://www.rollupjs.com/)

---

**安装依赖库**

```bash
# 安装 rollup 以及要用到的插件
yarn add --dev rollup rollup-plugin-babel rollup-plugin-commonjs rollup-plugin-eslint rollup-plugin-node-resolve rollup-plugin-json
# 安装 babel 相关的库
yarn add --dev @babel/core @babel/preset-env  
```

**创建文件（夹）**

```bash
touch rollup.config.js
mkdir src && touch src/index.js
```

**编辑 `rollup.config.js` 文件**

```typescript
import path from "path";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import json from 'rollup-plugin-json';

import { name } from "./package.json";

const paths = [
    path.join(__dirname, "/src/index.js"), // input
    path.join(__dirname, "/lib"), // output
];

// rollup 配置项
export default {
    input: paths[0],
    output: [
        // 输出 commonjs 规范的代码
        {
            file: path.join(paths[1], "index.js"),
            format: "cjs",
            name,
        },
        // 输出 es 规范的代码
        {
            file: path.join(paths[1], "index.esm.js"),
            format: "esm",
            name,
        },
    ],
    // external: ['lodash'], // 指出应将哪些模块视为外部模块，如 Peer dependencies 中的依赖
    // plugins 需要注意引用顺序
    plugins: [
        // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
        commonjs(),

        // 配合 commnjs 解析第三方模块
        resolve({
            // 将自定义选项传递给解析插件
            customResolveOptions: {
                moduleDirectory: "node_modules",
            },
        }),

        babel({
            runtimeHelpers: true,
            // 只转换源代码，不运行外部依赖
            exclude: "node_modules/**",
            // babel 默认不支持 ts 需要手动添加
            // extensions: [".js", ".ts"],
        }),

        json(),
    ],
};
```

**编辑 ` src/index.js` 文件**

```typescript
export function add(a, b){
    return a + b;
}

export function minus(a, b){
    return a - b;
}
```

**编辑`package.json`文件**

```json
{
    // ...,
    "scripts": {
        "build": "rollup -c"
    },
    // ...,
    "babel":{
        "presets": [
            [
                "@babel/preset-env",
                {
                    // Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS，导致 Rollup 的一些处理失败
                    "modules": false
                }
            ]
        ]
    }
}
```

**验证测试**

```bash
yarn build
# 或者
yarn rollup -c rollup.config.js
```

一切顺利的话会生成了 `index.js` 和 `index.esm.js` 文件，分别对应着 commonjs 规范和 es 规范的文件。

> Rollup 虽然大力推行 es 规范，然而很多三方库都仍旧使用 commonjs 规范，为了兼容可以两种规范都生成。

