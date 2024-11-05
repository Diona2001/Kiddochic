import SummaryApi from "../common"
import { toast } from 'react-toastify'

const addToCart = async(e,id) =>{
    e?.stopProgation()
    e?.preventDefault()

    const response = await fetch(SummaryApi.addToCartProduct.url,{
        method : SummaryApi.addToCartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            { productId : id }
        )
    })
    const responseData = await response.json()

    if(responseData.sucess){
        toast.success(responseData.message)
    }

    if(responseData.error){
        toast.success(responseData.message)
    }
}


export default addToCart