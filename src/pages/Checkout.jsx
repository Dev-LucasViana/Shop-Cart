import { useLocation, useNavigate } from "react-router-dom"


export default function Checkout(){

    const navigate = useNavigate()
    const location = useLocation()
    console.log(location);
    

    return(
        <div className="">
        <h1 className="text-3xl font-bold text-blue-500">Checkout</h1>
        <div className="cart-list">
            {
                location.state.cart.map((element) => {
                return(
                    <div className="cart-item">
                    <img width="100px" height="100px" src={ element.image } alt="" />
                    <p>{ element.title }</p>
                    </div>
                )
             })
            }
        </div>
        <button onClick={() => navigate('/Sucess')}>Finalizar</button>
        </div>
    )
}