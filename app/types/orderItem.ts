import {CartItem} from './cartItem'

export interface OrderItem{
    _id:string,
    id_user:string,
    products:CartItem[],
    totalPrice:number,
    address:string,
    createdAt:string,
    metodoPago:string,
    status:string,
    username:string
}