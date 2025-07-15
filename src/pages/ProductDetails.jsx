import { useEffect,useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import '../styles/DetailsPageStyle.css'

export default function ProductDetails(){


    const params = useParams()
    console.log(params)
    const [product, setProduct] = useState([])

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${params.id}`)
        .then((response) => response.json())
        .then((json) => setProduct(json))
    },[])

    return(
        <>
            <button type="button"></button>
            <h1>Detalhes do Produto</h1>
            <h3>{ product.title }</h3>
            <img src={ product.image } alt="" />
        </>
    )
}