# [Prettier](https://prettier.io/docs/en/index.html)

**安装依赖库**

```bash
yarn add --dev prettier
# 用以实行自动化
yarn add --dev husky lint-staged
```

**创建文件（夹）**

```bash
echo "" >> prettierrc
echo "" >> .prettierignore
```

**编辑 `.prettierrc`**

```json
# .prettierrc or .prettierrc.yaml

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
  }
  // ...
}
```
