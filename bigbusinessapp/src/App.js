import React, {Component} from 'react';
import Routes from './components/Routes';

//Entry point for the App
class App extends Component{
  render() {
    return (
      <React.Fragment>
       <main id='app'>
       <Routes />
       </main>
      </React.Fragment>
    );
  };
}
export default App;