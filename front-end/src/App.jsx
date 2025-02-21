import { useState } from 'react'
import './App.css'
import {Routes , Route,BrowserRouter} from "react-router-dom"
import { Link } from 'react-router-dom'
import Home from './components/Home.jsx'
import Products_page from './components/auxilary components/products_page.jsx'
import Product from './components/auxilary components/product.jsx'
import Cart from './components/auxilary components/cart.jsx'

function App() {
  const [shopping_cart , set_shopping_cart] = useState([]);
  const add_to_cart = (product)=>{
    set_shopping_cart((prev)=>[...prev , product])
    
  }
  return(
    <>
    <BrowserRouter>
    <Link to={"/"}>back to Home</Link>
    <br></br>
    <Link to={"/cart"}>view cart</Link>
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/item/' element={<Products_page products_type = ""/>}/>
        <Route path='/item/most_saled' element={<Products_page products_type = "most_saled"/>}/>
        <Route path='/item/most_ordered' element={<Products_page products_type = "most_ordered"/>}/>
        
        <Route path='/item/id/:id' element={<Product shop={add_to_cart}/>}/>
        
        <Route path='/category/:id' element ={<Products_page products_type = ""/>}/> 
        <Route path='/category/most_saled/:id' element ={<Products_page products_type = "most_saled"/>}/>
        <Route path='/category/most_ordered/:id' element ={<Products_page products_type = "most_ordered"/>}/>
        <Route path='/cart/' element = {<Cart products={shopping_cart}/>} />
      </Routes>
    </BrowserRouter>
    </>

  )
  
  // home component
    //search component
    //all products
    //most-saled
    //most-ordered
    //available categories
  // category component
  // search component
  // cart component
  //item component

}
export default App
