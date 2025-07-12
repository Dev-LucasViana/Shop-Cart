import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Products(){
    const [ data, setData] = useState([])


    useEffect(
        fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((json) => setData(json))
        ,[])

    return(
        <>
            <h1>Produtos</h1>
            {
                data.map((element) => {
                    return (
                        <>
                            {console.log(element)}
                            {/* <p>{ element.id }</p>
                            <img src={ element.image } alt="" /> */}
                        </>
                    )
                })
            }
        </>
    )
}