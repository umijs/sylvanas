import * as React from 'react';

interface ComponentProps {
  title?: string;
  children?: React.ReactNode;
}

interface ComponentState {
  keep: boolean;
}

class Component extends React.Component<ComponentProps, ComponentState> {
  state = {
    keep: false,
  };

  render() {
    const { title, children } = this.props;
    return (
      <div>
        {title && <h1>{title}</h1>}
        {children}
      </div>
    );
  }
}

export default Component;
