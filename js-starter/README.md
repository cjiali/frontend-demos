# Javscript Starter

## 配置 Yarn

**创建文件（夹）**

```bash
touch .yarnrc
```

**编辑 `.yarnrc`**

```
registry "https://registry.npm.taobao.org"

sass_binary_site "https://npm.taobao.org/mirrors/node-sass/"
phantomjs_cdnurl "http://cnpmjs.org/downloads"
electron_mirror "https://npm.taobao.org/mirrors/electron/"
sqlite3_binary_host_mirror "https://foxgis.oss-cn-shanghai.aliyuncs.com/"
profiler_binary_host_mirror "https://npm.taobao.org/mirrors/node-inspector/"
chromedriver_cdnurl "https://cdn.npm.taobao.org/dist/chromedriver"
```



## 配置 Git Hooks

---

> 通过配置 Git Hooks 可以运行一些自定义操作，这里主要通过`commit-msg`钩子对 commit message 进行校验，以规范化提交信息。
>
> 主要用到以下库：
>
> - `husky` 用于实现各种 Git Hooks。
>
> 当然，还存在现场的工具库可用于规范化提交信息，这里为方便高度地自定义提交信息的规范而手写了一个简单 commit message 校验脚本。

**安装依赖库**

```bash
yarn add husky lint-staged --dev
# 或者
npm install husky lint-staged -d
```

**创建建 scripts 文件（夹）**

```bash
mkdir scripts && touch scripts/verify-commit-msg.js && touch .huskyrc
```

**编辑 `scripts/verify-commit-msg.js`**

```js
#!/usr/bin/env node

/**
 * This is a commit-msg sample running in the Node environment,
 *    and will be invoked on the commit-msg git hook.
 * 
 * You can use it by renaming it to `commit-msg` (without path extension),
 *    and then copying the renamed file to your project's directory `.git/hooks/`.
 * 
 * Note: To ensure it can be run, you should grunt the renamed file (`commit-msg`) 
 *    with running command `chmod a+x .git/hooks/commit-msg` in your project's directory.
 */
const chalk = require('chalk')
const message = require('fs')
  .readFileSync(process.argv[2], 'utf-8')
  .trim()

const COMMIT_REG = /^(revert: )?(work|feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release)(\(.+\))?: .{1,50}/

if (!COMMIT_REG.test(message)) {
  console.log()
  console.error(
      `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`invalid commit message format.`)}\n\n` 
      + chalk.red(`  Proper commit message format is required for automated changelog generation. Examples:\n\n`) 
      + `    ${chalk.green(`ffeat(pencil): add 'graphiteWidth' option`)}\n` 
      + `    ${chalk.green(`fix(graphite): stop graphite breaking when width < 0.1 (close #28)`)}\n\n` 
      + chalk.red(`  See .github/commit-convention.md for more details.\n`)
  )
  process.exit(1)
}
```

> 上述脚本运行在 node 环境下，主要利用正则表达试对提交信息进行校验。
>
> 上述脚本内容直接拷贝到`.git/hooks/commit-msg`文件中也可成功运行（需要先创建`.git/hooks/commit-msg`文件并利用命令`chmod a+x .git/hooks/commit-msg`赋予可执行权限）。
>
> 更多 commit message 规范细节详见: [https://github.com/marktex/commit-convention](https://github.com/marktex/commit-convention)。

**编辑 `package.json`**

```json
{
    // ...,
    "hooks": {
        "pre-commit": "lint-staged",
        "commit-msg": "node scripts/verify-commit-msg.js ${HUSKY_GIT_PARAMS}"
    },
    "lint-staged": {},
    // ...
}
```

> 注：也可以直接将 `.huskyrc` 文件中的内容写到 `package.json` 文件中的 "husky" 属性下。

**验证测试**

```bash
git add .
git commit -m "test" # 提交信息不符合规范，正常情况下会报错
git commit -m "chore: use jest, eslint, prettier, editorconfig, husky, lint-staged, etc..."  # 提交信息符合规范，正常提交
```



## 配置 EditorConfig

---

> “EditorConfig 帮助开发人员在不同的编辑器和IDE之间定义和维护一致的编码样式。
>
> EditorConfig项目由用于定义编码样式**的文件格式**和一组**文本编辑器插件组成**，这些**插件**使编辑器能够读取文件格式并遵循定义的样式。
>
> EditorConfig文件易于阅读，并且与版本控制系统配合使用。
>
> 对于VS Core，对应的插件名是[EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

**创建文件（夹）**

```bash
touch .editorconfig
```

**编辑`.editorconfig`**

```bash
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true
charset = utf-8
indent_style = space
indent_size = 4

[{*.json,*.md,*.yml,*.*rc}]
indent_style = space
indent_size = 2
```



## 配置 Prettier

---

> Prettier 是格式化代码工具，用来保持团队的项目风格统一。

**安装依赖库**

```bash
yarn add --dev prettier
# 或者
npm install -d prettier
```

**创建文件（夹）**

```bash
touch .prettierrc.yml
```

**编辑 `.prettierrc.yml`**

```json
trailingComma: "all"
tabWidth: 4
semi: false
singleQuote: true
endOfLine: "lf"
printWidth: 120
overrides:
  - files: ["*.md", "*.json", "*.yml", "*.yaml"]
    options:
      tabWidth: 2
```

**编辑 `.prettierignore`**

```json
# Ignore artifacts:
build
coverage
```

**编辑 `package.json`**

```json
{
    // ...,
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    },
    "lint-staged": {
        "**/*": "prettier --write --ignore-unknown"
    },
    // ...
}
```



## 配置 ESLint

---

> TypeScirpt 已经全面采用 ESLint 作为代码检查 [The future of TypeScript on ESLint](https://eslint.org/blog/2019/01/future-typescript-eslint)，并且提供了 TypeScript 文件的解析器 和配置选项 [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)

**安装依赖库**

```shell
yarn add --dev eslint
# 或者
npm install -d eslint
```

**创建文件（夹）**

```bash
yarn eslint --init # 初始化 eslint 配置文件，或者 `npx eslint --init`
```

 **编辑 `.eslintrc.js`**

```js
module.exports = {
    /* Specify which environments you want to enable. An environment defines global variables that are predefined.*/
    env: {
        browser: true,
        es2021: true,           /* enables ES12 */
        node: true,
    },
    /* Extend the set of enabled rules from base configurations. */
    extends: ["eslint:recommended"],
    /* Specify the language options you want to support. */
    parserOptions: {
        ecmaVersion: 2021,                          /* Specify the version of ECMAScript syntax by setting to 2015 (also 6), 2016 (also 7), 2017 (also 8), etc. */
        sourceType: "module",                       /* Set to "script" (default) or "module" if your code is in ECMAScript modules. */
        /* An object indicating which additional language features you'd like to use. */
        ecmaFeatures: {
            // globalReturn: true,                  /* Allow return statements in the global scope */
            // impliedStrict: true,                 /* Enable global strict mode (if ecmaVersion is 5 or greater) */
            // jsx: true,                           /* Enable JSX */
            experimentalObjectRestSpread: true,
        },
    },
    /**
     * Configure rules.
     * To change a rule setting, you must set the rule ID equal to one of these values:
     * "off" or 0 - turn the rule off
     * "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
     * "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
     */
    rules: {
        /* Enable additional rules. */
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        
        /* Override default options for rules from base configurations. */
        // "comma-dangle": ["error", "always"],
        // "no-cond-assign": ["error", "always"],

        /* Disable rules from base configurations. */
        // "no-console": "off",
    },
};
```

**编辑 `package.json`**

```json
{
    // ...,
    "scripts": {
        // ...,
        "lint": "eslint",
        // ...
    },
    // ...,
    "lint-staged": {
        "**/*.js?(x)": [
            "eslint"
        ]
    },
    // ...
}
```



## 配置 Rollup

---

> Vue、React 等许多流行库都在使用 Rollup 进行，这里就不在过多介绍，详细信息见 [官网](https://www.rollupjs.com/) 。

**安装依赖库**

```bash
# 安装 rollup 以及要用到的插件
yarn add --dev rollup rollup-plugin-babel rollup-plugin-commonjs rollup-plugin-eslint rollup-plugin-node-resolve rollup-plugin-json
# 安装 babel 相关的库
yarn add --dev @babel/core @babel/preset-env

# 或者
npm install -d rollup rollup-plugin-babel rollup-plugin-commonjs rollup-plugin-eslint rollup-plugin-node-resolve
npm install -d @babel/core @babel/preset-env 
```

**创建文件（夹）**

```bash
touch rollup.config.js
```

**编辑 `rollup.config.js`**

```typescript
import path from "path";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import json from 'rollup-plugin-json';

import { name } from "./package.json";

const paths = [
    path.join(__dirname, "/src/index.ts"), // input
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

**编辑 ` src/index.js`**

```typescript
export function add(a, b){
    return a + b;
}

export function minus(a, b){
    return a - b;
}
```

**编辑`package.json`**

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



## 配置 Jest

---

**安装依赖库**

```shell
yarn add --dev jest
```

**创建文件（夹）**

```bash
touch jest.config.js sum.js
mkdir test && touch test/sum.spec.js
```

**编辑 `test/index.spec.js`**

> 编写功能测试

```typescript
const sum = require('../sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

**编辑 ` sum.js`**

```typescript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

**编辑 `package.json`**

```json
{
    // ...,
    "scripts":{
        // ...,
        "test": "jest -u",
        // ...
    },
    // ...,
    "jest": {
        "verbose": true, // 层次显示测试套件中每个测试的结果
        "coverage": true, // 输出测试覆盖率
        "testEnvironment": "node"
    }
}
```

**验证测试**

```
yarn test  
```

>  注意： 这里会生成一个 coverage 文件夹，需配置一下`.gitignore` 不然它将被提交提交。
>
>  ```bash
>  echo "coverage/" >> .gitignore
>  ```



## 配置 Conventional Changelog

**安装依赖库**

```shell
yarn add --dev conventional-changelog-cli  
# 或者
npm install -d  conventional-changelog-cli  
```

**编辑 `package.json`**

```json
{
	// ...,
    "scripts": {
        // ...,
        "version": "conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md",
        // ...
    },
    // ...
}
```

> 使用 conventional-changelog 需要注意：
>
> - 非常注意 commit 格式。这里格式采用 [angular commit 规范](https://github.com/angular/angular/blob/master/CONTRIBUTING.md)，会识别 feat 和 fix 开头的 commit 然后自动生成 Change Log 到 `CHANGELOG.md` 文件。
> - 每次更改需要先升级 version 再去生成。
>
> You could follow the following workflow: 
>
> 1. Make changes
> 2. Commit those changes
> 3. Pull all the tags
> 4. Run the [`npm version [patch|minor|major\]`](https://docs.npmjs.com/cli/version) command
> 5. Push
>
> If `preversion`, `version`, or `postversion` are in the `scripts` property of the package.json, they will be executed as part of running `npm version`.
>
> You could optionally add a `preversion` script to package your project or running a full suit of test. And a `postversion` script to clean your system and push your release and tags.

**编辑 `.npmrc`**

```
tag-version-prefix=""
message="chore(release): v%s"
```

**编辑 `.yarnrc`**

```
version-tag-prefix ""
version-git-message "chore(release): v%s"
```
