import React from 'react';
import useWidgetsStore from './state/useWidgetsStore';
import Widget from './component/Widget';

const App: React.FC = () => {
  // Adding a sample widget for demonstration
  const addWidget = useWidgetsStore((state) => state.addWidget);

  React.useEffect(() => {
    addWidget({
      id: '1',
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      type: 'sample-component',
      props: { message: 'Hello, World!' },
    });
  }, [addWidget]);

  return (
    <div>
      <h1>Widget System Example</h1>
      <Widget id="1" />
    </div>
  );
};

export default App;
