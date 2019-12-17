import React, {Component} from 'react';
import fire from './config/fire';
import LoginSignup from './components/LoginSignup'
import Home from './components/Home'
import './App.css';

class App extends Component{
  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.user ? (<Home />) : (<LoginSignup />)}
      </div>
    )
  }

}

export default App;
