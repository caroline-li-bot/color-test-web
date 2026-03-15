# AI 个人色彩测试

一个基于AI的韩国风格个人色彩测试网页应用，用户上传照片即可自动分析出适合的色彩类型。

## ✨ 功能特点

- 📸 **一键上传**：无需做题，上传照片即可得到结果
- 🤖 **AI 分析**：基于百度人脸分析API，精准识别肤色、发色、瞳孔色等特征
- 🎨 **专业建议**：结合韩国色彩理论，提供服装、首饰、彩妆专业建议
- 📱 **响应式设计**：完美适配手机、平板、桌面设备
- 🔒 **隐私保护**：照片分析后立即删除，不会存储用户数据

## 🚀 技术栈

- 前端：HTML + Tailwind CSS + 原生 JavaScript
- AI 引擎：百度智能云人脸属性分析 API
- 部署：Vercel

## 📦 部署到 Vercel

### 方法一：一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/caroline-li-bot/color-test-web)

### 方法二：手动部署

1. Fork 这个仓库到你的 GitHub 账号
2. 登录 [Vercel](https://vercel.com)
3. 导入你 Fork 的仓库
4. 点击部署，无需任何配置，Vercel 会自动识别并部署静态网站

## 🔧 配置百度 API（可选）

当前版本使用模拟数据演示，如果需要接入真实的百度AI API：

1. 注册 [百度智能云](https://cloud.baidu.com/) 账号
2. 创建人脸分析应用，获取 API Key 和 Secret Key
3. 由于浏览器跨域限制，你需要部署一个后端服务来代理API请求，避免暴露密钥
4. 修改 `script.js` 中的 `callBaiduFaceAPI` 方法，调用你的后端接口

## 📁 项目结构

```
color-test-web/
├── index.html          # 主页面
├── script.js           # 核心逻辑
├── README.md           # 项目说明
└── vercel.json         # Vercel 配置文件
```

## 🎨 色彩类型说明

项目采用韩国流行的四季色彩理论，将人分为四大色彩类型：

### 🌸 春季型
- 特点：明亮、温暖、鲜艳
- 适合：珊瑚橙、桃粉色、柠檬黄、薄荷绿等明亮暖色调
- 首饰：金色、玫瑰金

### 🌿 夏季型
- 特点：柔和、清冷、淡雅
- 适合：雾霾蓝、薰衣草紫、豆沙粉、米白色等低饱和度冷色调
- 首饰：银色、铂金

### 🍂 秋季型
- 特点：浓郁、厚重、温暖
- 适合：焦糖色、驼色、橄榄绿、枫叶红等大地色系
- 首饰：哑光金、复古金

### ❄️ 冬季型
- 特点：纯粹、冷艳、高对比
- 适合：正红色、宝蓝色、黑色、白色等高饱和度冷色调
- 首饰：亮银色、钻石

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
