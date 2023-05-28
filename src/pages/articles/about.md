[//]: # ({"name":"关于本博客","author":"Mike Liu","tag":["blog"],"license":"CC-BY 4.0"})

__本博客正在建设中__

## 有关本博客的技术细节

### 静态页面

静态页面采用 `React` 框架和 `MUI` 组件库，严格按照 `Material 2` 进行设计，追求 2017 年前后采用 `Material UI` 的国内互联网平台产生的整体视觉效果，由 @Tienle 参与主要设计。

### 博客描述

博客采用 `Markdown` 格式的博文数据，文章第一行是一个 `Markdown` 注释，注释内部有一个 `JSON` 配置，描述了文档的标题、作者、标签、许可协议。构建脚本（位于 `/scripts/articles.js` ，已合入 `create-react-app` 的构建生命周期）从 `/src/pages/articles` 中遍历所有子目录并读取文件修改时间、创建时间、全文数据，构建脚本将文章中注释后的 50 个字符作为 Preview 内容，并将其余数据整理后写入 `/src/pages/articles.json` 。

`/pages/articles.json` 的样例如下：

```json
[
  {
    "modify":"2023/5/27", // 该文件的修改日期
    "create":"2023/5/27", // 该文件的创建日期
    "context":"test\n1\n2\n3\n", // 该文件的 Preview 数据
    "path":"1.md", // 该文件 /pages/article 的相对位置
    "ext":".md", // 该文件的扩展名
    "showName":"1", // 该文件的标题或展示名
    "author":"Mike Liu", // 该文件的作者
    "tag":["1"], // 该文件的标签， array 型
    "license":"CC-BY 4.0" // 该文件的许可协议类型
    },
  ...
]
```

`PageLoader` 组件从 `/src/pages/articles.json` 导入文档数据，并创建文档选项列表。 `PageViewer` 根据得到的 `prop` 导入对应文件。重新配置了 `webpack` ，采用 `markdown-loader` 库，使之可以导入 `markdown` 文件并解析。采用 `highlight.js` 进行高亮。

### 博客部署

本博客采用 `create-react-app` 工具创建，在项目根目录执行 `npm run build` 或执行 `/script/build.js` 来构建项目，构建后的内容在 `/build` 中。

线上博客通过 `Cloudflare` 持续集成部署管线部署在 `Cloudflare Pages` ，博客源码将在建设完成后开源。

### TO-DO List

[ ] 侧边菜单

[ ] 时间线

[ ] 弹出菜单

[ ] Cloudflare 统计