import React, {Component} from 'react';
import InteractiveHeader from "./components/InteractiveHeader";
import ListElement from "./components/ListElement";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayData: null,
      confirmData: true,
      duplicate: false
    };
  }
  render() {
    const myCallback = arrayCallback => this.setState({arrayData: arrayCallback});
    const fullCallback = clickCallback => this.setState({confirmData: clickCallback});
    const duplicateCallback = dupliCallback => this.setState({duplicate: dupliCallback});
    return (<div className="app">
      <header className="app-header">
        <InteractiveHeader arrayCallback={myCallback} erCallback={this.state.confirmData} dupCallback={this.state.duplicate}/>
      </header>
      <ListElement clickCallback={fullCallback} arrCallback={this.state.arrayData} dupliCallback={duplicateCallback}/>
    </div>);
  }
}

export default App;
