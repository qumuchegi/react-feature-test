# React 特性实验集合

- `Select` 的作用：计算 state 衍生数据时，缓存组件计算结果，当其不变时不会因为全局 state 的改变而重复计算，从而提高性能。
- `immer.js` / PureCo,ponent / shouldComponentUpdate：immer.js 可以让父组件状态中的引用类型的数据地址不变，在父组件状态改变时，通过不改变其中引用类型数据的引用地址，可以让接收此引用类型数据的子组件通过浅对比就可以判断是否否应该随着父组件重新渲染，从而避免用深对比增大计算量，降低应用程序的性能。所以在使用 immer.js 来实现 React 性能优化时，需要子组件配合使用浅对比（可以是 PureComponent 或者用 shouldComponentUpdate 实现的浅对比、或者 React.memo）