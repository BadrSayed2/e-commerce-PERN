import api from "../axios-config.js"
import Products_slider from "./auxilary components/Products_slider.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Home(){
    const [categoriesObj, setCategoriesObj] = useState({categories : [] , loading : true , err : null});
    const fetch_categories = async ()=>{
        try{
            const fetch =  await api.get('/category/')
            // console.log(fetch.data);
            setCategoriesObj((prev)=>({...prev ,loading : false, categories : fetch.data}));
            
        }catch(e){
            console.log("error");
        }
    }
    useEffect( ()=>{
        fetch_categories();
    },[])
    
    return(
        <>
            <h1>Welcome to badr e-commerce</h1>
            <p>this ecommerce website is for those who want to be broke , <b>you will buy</b></p>
            <div>
                <h3>categories</h3>
                {categoriesObj.err? "there is an error" : ""}
                {categoriesObj.loading? "loading" : categoriesObj.categories.map(((category)=>
                   <Link to={"/category/"+category.id}> <h5 key={category.id * 20}>{category.name}</h5></Link>
                ))}
            </div>
            
            <div>
                <h3>all products</h3>
                <Link to={"/item"}><button>see all</button></Link>
                <Products_slider products_type={""} style={{display : "flex"}}></Products_slider>
            </div>

             <div >
                <h3>most saled</h3>
                <Link to={"/item/most_saled"}><button>see all</button></Link>
                <Products_slider products_type={"most_saled"}></Products_slider>
            </div>

             
            <div>
                <h3>most ordered</h3>
                <Link to={"/item/most_ordered"}><button>see all</button></Link>
                <Products_slider products_type={"most_ordered"}></Products_slider>
            </div>  
        </>
    );


}

export default Home;