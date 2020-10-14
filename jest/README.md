# [Jest](https://jestjs.io/docs/en/getting-started)

**安装依赖库**

```shell
yarn add --dev jest
```

**创建文件（夹）**

```bash
touch jest.config.js sum.js
mkdir test && touch test/sum.spec.js
```

**编辑 `jest.config.js`**

```javascript
module.exports = {  
    verbose: true,
    coverage: true,
    testEnvironment: 'node',
}
```

> - `--coverage` 输出测试覆盖率
> - `--verbose` 层次显示测试套件中每个测试的结果

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
    // ...
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

