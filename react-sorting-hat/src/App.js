import React from 'react';
import { Route, Link } from "react-router-dom";
import SortingHat from "./components/SortingHat";
import House from "./components/House";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      curUser: {}
    }
  }

  addUser = user => {
    
    console.log("CEA: App.js: addUser: ", user.name);

    this.setState({
      users: [
        ...this.state.users,
        user
      ],
      curUser: user
    });


    
  }


  render() {
    return (
      <div className = "app-container">
        <Route exact path = "/">
          <h1>Welcome to Hogwarts!</h1>
          <h2>School of Witchcraft and Wizardry</h2>
          <Link to = "/sorting-hat">Let's get Sorted!</Link>
          

        </Route>

        <Route path = "/sorting-hat" >
          <SortingHat users = {this.state.users} addUser = {this.addUser} />
        </Route>
        
        <Route path = "/house">
          <House user = {this.state.curUser} />
        </Route>
      </div>
    );
  }
}
