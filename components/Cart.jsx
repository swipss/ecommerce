import React, {useRef} from 'react'
import Link from 'next/link'
import {AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai'
import {TiDelete, TiDeleteOutline} from 'react-icons/ti'
import { Toast } from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'

const Cart = () => {
  const cartRef = useRef()
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity } = useStateContext()
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button className='cart-heading' type='button' onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

       {cartItems.length < 1 && (
        <div className='empty-cart'>
          <AiOutlineShopping size={250} />
          <h3>Your cart is empty</h3>
          <Link href="/">
            <button type='button' onClick={() => setShowCart(false)} className="btn">
            Continue shopping
            </button>
          </Link>
        </div>
       )} 

       <div className='product-container'>
        {cartItems.length >= 1 && (
          cartItems.map((cartItem, index) => (
            <div className='product' key={cartItem._id}>
              <img src={urlFor(cartItem?.image[0])} className="cart-product-image"/>
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{cartItem.name}</h5>
                  <h4>${cartItem.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span className="minus" onClick={() => toggleCartItemQuantity(cartItem._id, 'decrement')}>
                        <AiOutlineMinus />
                      </span>
                      <span className="num">
                        {cartItem.quantity}
                      </span>
                      <span className="plus" onClick={() => toggleCartItemQuantity(cartItem._id, 'increment')}>
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button type='button' className='remove-item' onClick="">
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
       </div>
       {cartItems.length >= 1 && (
        <div className='cart-bottom'>
          <div className='total'>
            <h3>Subtotal</h3>
            <h3>${totalPrice}</h3>
          </div>
          <div className='btn-container'>
            <button type='button' className='btn' onClick=''>
              Pay with Stripe
            </button>
          </div>
        </div>
       )}
      </div>

    </div>
  )
}

export default Cart