# 电影回忆录

一个记录看过的电影、随机推荐好电影的网站。包含加载首页、五系列摇摇乐和 22 部电影详情。

## 上传与发布

1. 在 GitHub 新建空仓库。
2. 将本文件夹中的全部文件上传到仓库根目录。
3. 默认分支使用 `main`。
4. 打开仓库 `Settings → Pages`，在 `Build and deployment` 的 Source 中选择 `GitHub Actions`。
5. 推送完成后，等待 `Actions` 中的 `Deploy to GitHub Pages` 运行结束。

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

生成内容位于 `dist`，该目录无需手动上传，GitHub Actions 会自动构建。
