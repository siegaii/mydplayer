# mydplayer

## 说明

此播放器基于开源弹幕播放器[DPlayer](https://github.com/DIYgod/DPlayer)。

出于实际使用上的需求需要对 DPlayer 做一些改造，包括添加一些 api，删除一些逻辑，修改调整样式...

DPlayer 是一个优秀的开源播放器，此项目回持续有选择的集成 DPlayer 的更新（以不与自定义内容冲突的前提条件下）

## 文档

[DPlayer 中文文档](http://dplayer.js.org/zh/guide.html)

使用上同 DPlayer 基本相同。

## 使用差异

### DPlayer

将 DPlayer 对象 添加至 window 中，在浏览器环境在可以直接调用 DPlayer 对象。

> why: 我自己在使用 es6 import() 方法动态导入模块的时候会出现找不到 DPlayer 的情况。

### 弹幕速度

为播放器添加弹幕速度控制的配置和方法，控制弹幕速度（0 ～ N 倍速）

-   Add a option for player

```js
const dp = new DPlayer({
    ...
    danmaku: {
        ...
       speedRate: 2  // danmaku speed rate
    },
});
```

-   Add a public method for danmaku

```js
const dp = new DPlayer({...})
const rate = 2
dp.danmaku.speed(rate)
```

> why: 总会有这种需求需要弹幕速度随视频播放速度变化，或是想要弹幕更快一些或更慢一些。
