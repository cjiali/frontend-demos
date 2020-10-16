# [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)

**安装依赖库**

```shell
yarn add --dev conventional-changelog-cli  
```

**编辑 `package.json` 文件**

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

**编辑 `.npmrc` 文件**

```
tag-version-prefix=""
message="chore(release): v%s"
```

**编辑 `.yarnrc` 文件**

```
version-tag-prefix ""
version-git-message "chore(release): v%s"
```