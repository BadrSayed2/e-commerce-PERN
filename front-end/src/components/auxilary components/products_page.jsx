import api from "../../axios-config.js";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Products_page({products_type}){
    const [fetched , setFetched] = useState({products : [] , loading : true , err :null});
    const [offset, setOffset] = useState(0);
    const {id} = useParams();

    const fetch_products = async (off)=>{
        let products = [];
        try{
            
            if(id){
                products = await api.get('/items/category/+'+id+'?sort='+products_type + '&limit=10&offset='+off + ';');
            }else{
                products = await api.get('/items/?sort='+products_type + '&limit=10&offset='+off + ';');
            }
            // console.log(products.data);
            setFetched((f)=>{return {...f , loading : false , products : products.data }})
        } catch(e){
            console.log(e);
            setFetched((f)=>{return {...f , err : e}});
        }
    }

    useEffect( ()=>{
        fetch_products(offset);
    },[offset]);
    //query parameters int limit ,enum product_type = {"most_saled" , "most_ordered" , "price"} 
    // fetch products => loading | error | products
    // 
    
    return(
        <div>
            
            {fetched.err ? <h1>Internal server error</h1> : ""}
            {fetched.loading ? "loading": fetched.products.map((product)=>{
                return <div className="product_card" key={product.id } >
                            <Link to={"/item/id/" + product.id}><img width = "200px" height = "200px"src={"/assets/pictures/" + product.picture_url} alt="Shirt"/></Link>
                            {/* {console.log('front-end\\src\\assets\\pictures\\shirt.jpg')} */}
                            <Link to={"/item/id/" + product.id}><h3 key={product.id * 15}>{product.name}</h3></Link>
                            <p>category <Link to={"/category/" + product.category.id}>{product.category.name}</Link></p>
                            {(product.discounts)? <div key={product.id *100}>
                                    <p key={product.id }>Original Price: <span style={{textDecoration : "line-through"}} >{product.price}</span></p>
                                    <p key={product.id *10}>Discounted Price: <mark>{product.price * (1 - (product.discounts.value * 0.01 ))}</mark></p>
                                </div> : <p key={product.id }>price {product.price}</p>}
                        </div>
                        
            })}
            {fetched.products.length == 0 ? <h1>No Products Found </h1>: ""}
            <div>
                <button onClick={()=>{setOffset((of)=>(Math.max(of - 10, 0)) )}} disabled= {offset ==0}>previous</button>
                <button onClick={()=>{setOffset( (of)=>( of+10 )  )}} disabled= {fetched.products.length==0}>next</button>
            </div>
        
        </div>
        
        
    );
}

export default Products_page;