# @repo/typescript-config

共享的 TypeScript 配置文件，用于统一 monorepo 中的 TypeScript 设置。

## 配置文件

- **nextjs.json**: 为 Next.js 项目优化，包含 JSX 支持、路径别名和严格类型检查
- **type-stripping.json**: 为 Node.js 项目的 Type stripping 特性设计，专注于类型检查而非生成代码

## 使用方法

```bash
# 安装
pnpm add -D --workspace @repo/typescript-config
```

在项目的 `tsconfig.json` 中引用：

```json
{
  "extends": "@repo/typescript-config/nextjs.json", // 或 type-stripping.json
  "compilerOptions": {
    // 项目特定的选项
  }
}
```
