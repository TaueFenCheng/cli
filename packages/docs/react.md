### React.memo 
React.memo  的第二个参数 主要检查 props 的变化,如果函数组件内部有使用useState、useReducer或者useContext这些Hook时，那么就算props没有发生变化，组件还是会重新渲染。这是因为内部状态的变化或者上下文的变化都可能会导致组件更新。

```ts
// 返回 true 时不重新渲染  返回 false 时重新渲染
const areEqual = (prevProps, nextProps) => {
  // 只有当name属性不同的时候才更新组件
  return prevProps.name === nextProps.name;
}

const MyComponent = React.memo(props => {
  // 组件逻辑和渲染
}, areEqual);
```
#### React.memo 经常和useCallback hooks搭配使用 当子组件使用props传入的函数用useCallBack包裹时 子组件使用React.memo 可以有效减少组件的无效渲染。降低渲染次数。

### React memo 同class的类组件生命周期 shouldComponentUpdate(nextProps, nextState) 相反

```ts

// 返回true 表示更新  返回false 表示不更新
class MyComponent extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
    // 比较props和state，决定是否需要更新
    return nextProps.someValue !== this.props.someValue ||
    nextState.someState !== this.state.someState;
    }
    // 其他方法
}
```



