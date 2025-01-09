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

    /* If transpiling with TypeScript: */
    "module": "NodeNext",
    "outDir": "dist",
    "sourceMap": true,

    /* AND if you're building for a library: */
    "declaration": true,

    /* AND if you're building for a library in a monorepo: */
    "composite": true,
    "declarationMap": true,

    /* If NOT transpiling with TypeScript: */
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


