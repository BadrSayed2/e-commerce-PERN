function Cart({products}) {
    
    return(
        <div>
            {products.map((product)=>{
                return <div>
                             <img width = "60px" height = "60px"src={"/assets/pictures/" + product.picture_url} alt="Shirt"/>
                            <p >{product?.name}</p>
                            {(product.discounts)? <div key={product.id *100}>
                                    <p key={product.id }>Original Price: <span style={{textDecoration : "line-through"}} >{product.price}</span></p>
                                    <p key={product.id *10}>Discounted Price: <mark>{product.price * (1 - (product.discounts.value * 0.01 ))}</mark></p>
                                </div> : <p key={product.id }>price {product.price}</p>}
                            <p>{product?.quantity}</p>
                        </div>
            })}
        </div>
    );
}

export default Cart;