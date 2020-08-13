import React from 'react';
import data from "./data.json";
import Menus from './components/Menus';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends React.Component {
   constructor(){
     super();
     this.state = {
       menus: data.menus,
       cartItems: localStorage.getItem("cartItems")
       ?JSON.parse(localStorage.getItem("cartItems"))
       :[],
       size:"",
       sort:"",

     };
   }
   createOrder = (order) =>{
     alert("Need to save order for"  +   order.name);
   };
   removeFromCart =(menu) =>{
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== menu._id),
    });
    localStorage.setItem(
      "cartItems", 
      JSON.stringify(cartItems.filter((x) => x._id !== menu._id))
      );
   };
   addToCart = (menu) =>{
     const cartItems = this.state.cartItems.slice();
     let alreadyInCart = false;
     cartItems.forEach((item) =>{
       if(item._id === menu._id){
         item.count++;
         alreadyInCart = true;
       }
     });
     if(!alreadyInCart){
       cartItems.push({...menu, count: 1});
     }
     this.setState({cartItems});
     localStorage.setItem("cartItems", JSON.stringify(cartItems));
   };
  
   sortMenus = (event) => {
     const sort = event.target.value;
     console.log(event.target.value);
     this.setState(state => ({
       sort: sort,
       menus: this.state.menus
       .slice()
       .sort((a,b) =>
         sort ==="lowest"
         ?a.price > b.price
         ? 1
         :-1
        :sort ==="highest"
        ?a.price < b.price
        ? 1
        :-1
        :a._id > b._id
        ? 1:-1
        ),
         
     }));
   }
   filterMenus = (event) => {
    console.log(event.target.value);
    if(event.target.value === ""){
      this.setState({size: event.target.value, menu:data.menus});
    } 
    else{
      this.setState({
        size: event.target.value,
        menus: data.menus.filter(menu => menu.availableflavour.indexOf(event.target.value)>=0),
      });
    }
   
   }
  render(){
  return (
    <div className="grid-container">
      <header>
        <a href="/">Anna Ratanam: Gems of Food</a>
      </header>
      <main>
       <div className="content">
         <div className="main">
           <Filter count={this.state.menus.length}
           size={this.state.size}
           sort={this.state.sort}
           filterMenus={this.filterMenus}
           sortMenus={this.sortMenus}>

           </Filter>
           
           <Menus menus={this.state.menus} addToCart={this.addToCart}></Menus>
         </div>
         <div className="sidebar">
           <Cart cartItems={this.state.cartItems} removeFromCart ={this.removeFromCart}
           createOrder={this.createOrder}/>
         </div>
       </div>
      </main>
      <footer>
        All right is reserved.
      </footer>
    </div>
  );
  }
}

export default App;
