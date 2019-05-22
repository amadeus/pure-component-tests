import React, {PureComponent, Component, createContext} from 'react';
import './App.css';

const CounterContext = createContext(0);

const FuncCounter = () => (
  <CounterContext.Consumer>
    {value => {
      console.log('rendering FuncCounter');
      return <div>Counter is {value}</div>;
    }}
  </CounterContext.Consumer>
);

const FuncChild = () => {
  console.log('rendering FuncChild');
  return <div>Functional child</div>;
};

class Tester extends PureComponent {
  render() {
    console.log('rendering Tester');
    return (
      <div>
        I am a pure child
        <FuncCounter />
        <FuncChild />
      </div>
    );
  }
}

class App extends Component {
  state = {
    counter: 0,
  };

  componentDidMount() {
    setInterval(() => this.setState(({counter}) => ({counter: counter + 1})), 1000);
  }

  render() {
    console.log('rendering App');
    return (
      <CounterContext.Provider value={this.state.counter}>
        <FuncCounter />
        <Tester />
        <FuncChild />
      </CounterContext.Provider>
    );
  }
}

export default App;
