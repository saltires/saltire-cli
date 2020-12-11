描述
===========================
:bullettrain_front: `saltire-cli`是一款简单易用的脚手架工具，你只需要记住它的两个 API 便可以快速上手，其中一个用于列举目前存在的模板，另一个则用于创建项目

****


API | 说明
---|---
list | 列举所有可用的模板
<模板名称> <项目名称> | 使用指定的模板创建指定的项目


### 可用模板

模板名称 | 模板说明
---|---
right-pc | 快速搭建骑士 pc 端站点
ex | 快速搭建个人测试站点

### 可选参数
`saltire-cli <template name> <project name> --force || -f`

    默认情况下，待创建的项目应该是一个空文件夹，但是当你想建立的项目已经存在时，就需要去覆盖已经存在的文件，默认情况下，脚手架会提供一些选择，你可以根据选项做出决定，不过，如果你明确地知道自己在做什么，你可以使用该选项直接覆盖已存在的文件，省去脚手架的问询阶段

`saltire-cli <template name> <project name> --offline || -o`

    假如缓存中存在模板文件，使用缓存中的模板文件创建项目

`saltire-cli list --json || -j`

    以 json 格式输出可用模板列表

`saltire-cli list --short || -s`

    只列出模板文件简单的描述



### 使用案例 1 - 列举可用模板

```
saltire-cli list
```

### 使用案例 2 - 创建个人测试站点

```
saltire-cli ex exnpm
```