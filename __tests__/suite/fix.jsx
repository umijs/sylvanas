import * as React from 'react';
import x from 'import-fresh';

class Component extends React.Component {
  state = {
    keep: false,
  };

  render() {
    const { keep } = this.state;
    const { title, children } = this.props;
    return (
      <div>
        {title && (
          <h1>
            {title}
            {keep}
          </h1>
        )}
        {children}
      </div>
    );
  }
}

export default Component;
