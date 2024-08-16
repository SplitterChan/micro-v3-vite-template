# 微前端通用模版

### 工程结构介绍

-- src

---- api `接口集合`

---- assets `资源文件`

---- components `组件库`

---- hooks `hook函数`

---- layouts `布局模版`

---- pages `页面路由文件`

---- stores `pinia store`

---- utils `工具集`

### 全局本地存储解决方案

**src/utils/cache**

`cache实现会话级别的存储隔离，并且挂载在app实例上，可以通过hooks提供的useCurrentInstance获取全局实例来使用。
cache内部提供两种存取方法set,setPublic。默认set会做存储名加签，在生产环境隔离，setPublic不做隔离同web端默认存储方式`

CacheType提供枚举

> Session -> window.sessionStorage
>
> Storage -> window.localStorage
>
> Cookie -> cookie

使用示例：

```javascript
const { proxy } = useCurrentInstance();
proxy.$cache.set('token', '214214', CacheType.Session);
console.log(proxy.$cache.get('token', CacheType.Session));
```

### 全局路由及布局解决方案

工程使用了vite-plugin-pages插件，实现约定式路由。默认路由入口文件夹为pages文件夹，index.vue为默认路由文件。

项目搭配使用了vite-plugin-vue-layouts实现快捷页面布局模版功能，项目默认配置布局模版为BaseLayout.vue。
自定义模版文件使用方式有两种如下：

(1) yaml模式

```javascript
<script setup lang="ts">
</script>
<template></template>
<route lang="yaml">
meta:
  layout: OtherLayout   // OtherLayout为其他模版文件名，省略.vue后缀
</route>
```

(2) json模式

```javascript
<script setup lang="ts">
</script>
<template></template>
<route>
{
  name: "Xxx",
  meta: {
    layout: "OtherLayout"   // OtherLayout为其他模版文件名，省略.vue后缀
    title: "xxx"
  }
}
</route>
```

### class命名规则及样式解决方案

项目class命名遵从BEM命名规范，在全局的scss文件中注入了variables.scss文件，bem默认命名空间为m

> block命名规则为 m-${block}  样式定义规则为@include b(${block}) {}
>
> element命名规则为 m-${block}__${element} 样式定义规则为@include e(${element}){}
>
> modifier命名规则为 m-${block}--${modifier} 样式定义规则为 @include m(${modifier}){}

##### 全局样式解决方案

工程内默认引入unocss,通过unocss大量降低样式代码书写量

1. 在uni.config.ts文件中可以自定义配置常用的样式与简化类目的正则匹配规则。例如：

```javascript
['flex', { display: 'flex' }],
  [/^m-([\.\d]+)$/, ([, num]) => ({ margin: `${num}px` })],
  [/^p-([\.\d]+)$/, ([, num]) => ({ padding: `${num}px` })];
```

2. 前置引入了uno官方预设样式配置，具体参考文档 [https://venerable-strudel-d42cce.netlify.app/presets/uno.html](https://venerable-strudel-d42cce.netlify.app/presets/uno.html)
3. 默认引入presetAttributify，可以通过

```javascript
<button
  bg='blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600'
  text='sm white'
  font='mono light'
  p='y-2 x-4'
  border='2 rounded blue-200'
>
  Button
</button>
```

这种属性的方式书写样式。

> 推荐在vscode中可以安装UnoCSS插件，不仅有输入提示，并且还可以鼠标悬浮显示编译后的css样式，对自定义的 shortcuts、rules 和 colors 都生效

4. 引入外部icon方法具体参考 [https://venerable-strudel-d42cce.netlify.app/presets/icons.html](https://venerable-strudel-d42cce.netlify.app/presets/icons.html)

### 微前端工程间交互解决方案

1. 主工程内置一个global的store，会分发到每个嵌入的子工程中。
2. 子工程通过useGlobalContext获取到全局状态，实现父子，兄弟工程的数据交互
3. useGlobalContext hook的返回返回值为state和setState。state就是全局状态数据，state内部数据通过各唯一工程名隔离。setState调用方法示例如下：

```javascript
const { state, setState } = useGlobalContext();

function changeGlobalState() {
  setState({ count: state['main'].count + 1 }, 'main');
}
```

**setState(payload, name)**

### 其他

(1) 工程代码全部做了git提交前置校验，代码需满足项目配置lint和prettier规则后才可以提交。

(2) script默认提供lint:fix和prettier:fix命令帮助快速修复代码格式化及简单的lint规范问题

(3) commit -m "msg" msg书写格式为"feat: xxx", 仅支持feat,update,fix,refactor,optimize,style,docs,chore描述类型
