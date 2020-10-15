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

```yaml
printWidth: 120 # Specify the line length that the printer will wrap on.
tabWidth: 4 # Specify the number of spaces per indentation-level.
# semi: false             # Sure to add a semicolon at the end of every statement?
singleQuote: true # Sure to use single quotes instead of double quotes?
trailingComma: 'all' # Where(ver) to print trailing when multi-line?
endOfLine: 'lf' # Specify line endings. PS: \n(LF), \r(CR), \r\n(CRLF).
overrides:
  - files: '.prettierrc'
    options:
      parser: 'yaml' # Specify which parser to use.
  - files: ['*.md', '*.json', '*.yml', '*.yaml']
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
