import './App.css';
import { Component } from 'react'

class App extends Component {

  state = {
    playing: false,
    started: false
  }

  togglePlay = () => {
    this.setState({
      playing: true
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span>Initialized State</span>
        </header>
      </div>
    );
  }
}

export default App;
