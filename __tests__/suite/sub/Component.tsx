import * as React from 'react';

interface ComponentProps {
  title?: string;
  children?: React.ReactNode;
}

const Component: React.FunctionComponent<ComponentProps> = ({ title, children }) => {
  return (
    <div>
      {title && <h1>{title}</h1>}
      {children}
    </div>
  );
};

export default Component;
