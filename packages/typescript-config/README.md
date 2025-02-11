## [The TSConfig Cheat Sheet](https://www.totaltypescript.com/tsconfig-cheat-sheet)

```json
{
  "compilerOptions": {
    /* Base Options: */
    "esModuleInterop": true,
    "skipLibCheck": true,
    "target": "es2022",
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "verbatimModuleSyntax": true,

    /* Strictness */
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,

    /* If transpiling with tsc: */
    "module": "NodeNext",
    "outDir": "dist",
    "sourceMap": true,

    /* AND if you're building for a library: */
    "declaration": true,

    /* AND if you're building for a library in a monorepo: */
    "composite": true,
    "declarationMap": true,

    /* If NOT transpiling with tsc: */
    "module": "preserve",
    "noEmit": true,

    /* If your code runs in the DOM: */
    "lib": ["es2022", "dom", "dom.iterable"],

    /* If your code doesn't run in the DOM: */
    "lib": ["es2022"]
  }
}
```

## `"esModuleInterop"": true`
修复 CommonJS 和 ES6 模块之间的兼容性问题。

TS 对 import 的编译:
```js
 // before
 import React from 'react';
 console.log(React)
 // after
 var React = require('react');
 console.log(React['default'])


 // before
 import {Component} from 'react';
 console.log(Component);
 // after
 var React = require('react');
 console.log(React.Component)


 // before
 import * as React from 'react';
 console.log(React);
 // after
 var React = require('react');
 console.log(React);
```

TS 对 export 的编译：
```js
 // before
 export const name = "esm";
 export default {
   name: "esm default",
 };

 // after
 exports.__esModule = true;
 exports.name = "esm";
 exports["default"] = {
   name: "esm default"
 }
```

TS 开启 esModuleInterop 后：
```js
 // before
 import React from 'react';
 console.log(React);
 // after 代码经过简化
 var react = __importDefault(require('react'));
 console.log(react['default']);


 // before
 import {Component} from 'react';
 console.log(Component);
 // after 代码经过简化
 var react = require('react');
 console.log(react.Component);


 // before
 import * as React from 'react';
 console.log(React);
 // after 代码经过简化
 var react = _importStar(require('react'));
 console.log(react);
```

```js
var __importDefault = function (mod) {
  return mod && mod.__esModule ? mod : { default: mod };
};
```

> esm 导入 cjs 兼容问题的产生是因为 esm 有 default 这个概念，而 cjs 没有。任何导出的变量在 cjs 看来都是 module.exports 这个对象上的属性，esm 的 default 导出也只是 cjs 上的 module.exports.default 属性而已。
>
> [esModuleInterop 到底做了什么？](https://zhuanlan.zhihu.com/p/148081795)

## `"skipLibCheck": true`
跳过对 d.ts 文件的类型检查

> Rather than doing a full check of all d.ts files, TypeScript will type check the code you specifically refer to in your app’s source code.
>
> [Understanding TypeScript’s skipLibCheck Once and For All](https://www.testim.io/blog/typescript-skiplibcheck/)

## `"target": "es2022"`
指定编译出来的 JavaScript 代码的 ECMAScript 版本

## `"allowJs": true`
允许 TypeScript 项目加载 JS 脚本。编译时，也会将 JS 文件，一起拷贝到输出目录

## `"resolveJsonModule": true`
允许 import 命令导入 JSON 文件

> This includes generating a type for the import based on the static JSON shape

## `"moduleDetection": "force"`
强制将所有文件视为模块

## `isolatedModules: true`
设置如果当前 TypeScript 脚本作为单个模块编译，是否会因为缺少其他脚本的类型信息而报错，主要便于非官方的编译工具（比如 Babel）正确编译单个脚本。

设置 isolatedModules 会告诉 TypeScript，如果编写的某些代码无法被单文件转译过程正确解释，它就会发出警告。

[Isolated Modules](https://www.typescriptlang.org/tsconfig/#exports-of-non-value-identifiers)

[理解Typescript配置项: isolateModules](https://juejin.cn/post/7053298681037979678)

## `"verbatimModuleSyntax": true`
任何没有 type 修饰符的 import 或 export 都被保留。

任何使用 type 修饰符的内容都被完全删除。

[Verbatim Module Syntax](https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax)

## `"noUncheckedIndexedAccess": true`
TypeScript 有一种方法可以描述具有未知键但在对象上具有已知值的对象，通过索引签名。

开启 noUncheckedIndexedAccess 将会在类型中为任何未声明的字段添加 undefined。

## `"noImplicitOverride": true`
用于强制在覆盖父类方法或属性时显式添加 override 修饰符。

## `"module": "nodenext"/"preserve"`
指定编译后的模块格式

nodenext: 支持 Node.js 的 ESM 和 CommonJS 模块系统，自动适配文件扩展名和 package.json 的 type 字段。

=> `moduleResolution: NodeNext`

preserve: TypeScript 编译器在编译过程中会保留源文件中的模块语法。不会将模块语法转换为 CommonJS 或其他模块格式，而是让工具链（如 Webpack、Rollup、ESBuild 等）或运行时环境处理模块的解析和执行。

=> `moduleResolution: Bundler`

## `"declaration": true`
为项目中的每个 TypeScript 或 JavaScript 文件生成 .d.ts 类型声明文件，用于描述模块的外部 API。

## `"declarationMap": true`
设置生成.d.ts类型声明文件的同时，还会生成对应的 Source Map 文件。

## `"noEmit": true`
控制编译器是否生成输出文件（如 .js 或 .d.ts 文件）。

当设置为 true 时，TypeScript 不会生成任何编译输出，但仍然会进行类型检查和代码解析。

## `"lib": ["es2022", "dom", "dom.iterable"]`
需要加载的 TypeScript 内置类型描述文件

## `"composite": true`
> Tells TypeScript to emit .tsbuildinfo files. This tells TypeScript that your project is part of a monorepo, and also helps it to cache builds to run faster.

## Other

## `"allowImportingTsExtensions": true`
Allows TypeScript files to import each other with a TypeScript-specific extension like .ts, .mts, or .tsx.

This flag is only allowed when --noEmit or --emitDeclarationOnly is enabled.

## `"rewriteRelativeImportExtensions": true`

[When an import path is relative (starts with ./ or ../), ends in a TypeScript extension (.ts, .tsx, .mts, .cts), and is a non-declaration file, the compiler will rewrite the path to the corresponding JavaScript extension (.js, .jsx, .mjs, .cjs).](https://devblogs.microsoft.com/typescript/announcing-typescript-5-7/#path-rewriting-for-relative-paths)


# [Live types in a TypeScript monorepo](https://colinhacks.com/essays/live-types-typescript-monorepo)
