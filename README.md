<h1 align="center">@walrus/rollup-plugin-shebang</h1>

Rollup plugin to automatically preserve shebangs in entry modules.

主要解决命令行工具 `#!/usr/bin/env node` 编译问题

## 🏗 安装

```sh
// npm
npm install @walrus/rollup-plugin-shebang --save --dev

// yarn
yarn add @walrus/rollup-plugin-shebang --dev
```

## 🔨 使用

```
// rollup.config.js
import shebang from '@walrus/rollup-plugin-shebang';

export default {
  plugins: [
    shebang()
  ]
}
```
