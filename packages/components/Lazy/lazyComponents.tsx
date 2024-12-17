// src/components/HighComponents/LazyComponent.tsx
import React from 'react';

const lazyCaches: { [key: string]: React.ComponentType<any> } = {};

function lazyComponent(lazyName: string, loadComponent: () => Promise<any>) {
  lazyCaches[lazyName] = lazyCaches[lazyName] || (
    class AsyncComponent extends React.PureComponent<any, { Component: React.ComponentType<any> | null }> {
      state: { Component: null; };
      constructor(props: any) {
        super(props);
        this.state = { Component: null };
      }
      async componentDidMount() {
        const { default: Component } = await loadComponent();
        this.setState({ Component });
      }
      render() {
        const Component = this.state.Component;
        return (
          Component ? <Component {...this.props} /> : null
        )
      }
    }
  )
  return lazyCaches[lazyName];
}

export default lazyComponent;
