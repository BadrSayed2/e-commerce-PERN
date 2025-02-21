import api from "../../axios-config.js";
import { useEffect , useState} from "react";
import { Link, useParams } from "react-router-dom";

function Product({shop}){
    const [fetched , setFetched] = useState({products : [] , loading : true , err :null});
    const {id} = useParams();
    const [buy_quantity , setQuantity] = useState(0);

    const fetch_products = async (off)=>{
        let products = [];
        
        try{
            
            products = await api.get('/items/id/+'+id +';');
            // console.log(products.data);
            
            setFetched((f)=>{return {...f , loading : false , products : products.data }})
        } catch(e){
            console.log(e);
            setFetched((f)=>{return {...f , err : e}});
        }
    }

    useEffect( ()=>{
        fetch_products(0);
    },[]);
    //query parameters int limit ,enum product_type = {"most_saled" , "most_ordered" , "price"} 
    // fetch products => loading | error | products
    // 
    const product = fetched.products;
    return(
        <div>
            {fetched.err ? <h1>Internal server error</h1> : ""}
            {fetched.loading ? "loading": <div className="product_card" key={product.id } >
                            <img width = "200px" height = "200px"src={"/assets/pictures/" + product.picture_url} alt="Shirt"/>
                            {/* {console.log('front-end\\src\\assets\\pictures\\shirt.jpg')} */}
                            <h3 key={product.id * 15}>{product.name}</h3>
                            {(product.discounts)? <div key={product.id *100}>
                                    <p key={product.id }>Original Price: <span style={{textDecoration : "line-through"}} >{product.price}</span></p>
                                    <p key={product.id *10}>Discounted Price: <mark>{product.price * (1 - (product.discounts.value * 0.01 ))}</mark></p>
                                </div> : <p key={product.id }>price {product.price}</p>
                                }
                            <p>{product.description}</p>
                            <Link to={"/category/" + product.category.id}><h4>{product.category.name}</h4></Link>
                            <div>
                                <p>{buy_quantity}</p>
                                <button style={{fontSize : "10em"}} onClick={()=>{setQuantity((q)=> Math.min(q + 1 , product.quantity))}}>+</button>
                            </div>
                            <button onClick={()=>{shop({...product , quantity :buy_quantity })}}>add to cart</button>
                    </div>
            }
            
        </div>
        
    );
}

export default Product;