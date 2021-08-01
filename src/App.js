import logo from './logo.svg';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import { DISHES } from './shared/dishes';
import React,{Component} from 'react';
//import Menu from './components/MenuComponent';

function App(){
    constructor(props){
      super(props);
      this.state = {
        dishes: DISHES
      };
    }
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Confusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} />
      </div>
    );
}

/*
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }
  return(
  <Menu dishes={this.state.dishes} />
  );
}*/
export default App;
