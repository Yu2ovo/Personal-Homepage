# 项目展示站 project-showcase

这是一个用于求职展示的个人项目站点，主要展示：

- 云学堂在线教育平台
- AI 智能客服
- Java 后端、微服务、AI 应用开发技术栈

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开终端输出的地址，一般是：

```text
http://localhost:5173
```

## 打包构建

```bash
npm run build
```

构建产物在 `dist` 目录。

## 部署到 Vercel

1. 将项目上传到 GitHub。
2. 打开 Vercel，选择 `Add New Project`。
3. 导入 GitHub 仓库。
4. Framework 选择 `Vite`。
5. Build Command 使用 `npm run build`。
6. Output Directory 使用 `dist`。
7. 点击 Deploy。

## 需要你自己修改的内容

在 `src/App.jsx` 顶部修改：

```js
const PROFILE = {
  name: '陆鹏宇',
  title: 'Java 后端开发 / AI 应用开发',
  school: '南京理工大学 · 计算机技术 · 2027 届',
  email: '2592875730@qq.com',
  github: 'https://github.com/yourname',
  resumeUrl: '#',
}
```

建议修改：

- GitHub 地址
- 简历下载链接
- Demo 链接
- 项目 GitHub 链接
- 项目描述中的量化结果
