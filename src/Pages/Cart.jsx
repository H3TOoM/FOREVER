import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { setSelectedItems, cartNum, setCartNum } = useContext(AppContext)
  const navigate = useNavigate();
  const storedItems = localStorage.getItem("cartItems")
  const parsedItems = JSON.parse(storedItems) || []

  const [cartItems, setCartItems] = useState(parsedItems.filter(item => Object.keys(item).length > 0))

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setSelectedItems(updatedCart);
  }

  const handleDelete = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setSelectedItems(updatedCart);

    const totalQuantity = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartNum(totalQuantity);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  }

  // total price 
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // save total price and quantities in local storage
  useEffect(() => {
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    setCartNum(totalQuantity);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotalPrice', totalPrice.toString());
    localStorage.setItem('cartTotalQuantity', totalQuantity.toString());
  }, [cartItems]);




  const checkout = () => {
    if (totalPrice === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'Please add any item to cart',
        icon: 'error',
        confirmButtonText: 'Close',
        confirmButtonColor: '#000000',
      });
      return;
    } else {
      navigate('/place-order');
    }
  }

  return (
    <div className='border-t pt-14 border-gray-300'>
      <div className='text-2xl mb-3'>
        <p className='text-gray-500 font-medium text-3xl mb-3'>
          YOUR <span className='text-gray-700'>CART</span>
        </p>
      </div>

      <div>
        {
          cartItems.length > 0 && (
            cartItems.map((item, index) => (
              <div
                key={index}
                className='flex justify-between border-t border-b border-gray-300 py-2 items-center'>
                {/* details */}
                <div className=' flex items-start gap-6'>
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className='w-16 sm:w-20' />
                  <div>
                    <p
                      className='text-xs sm:text-lg font-medium'>
                      {item.name}
                    </p>
                    <div className='flex gap-4 items-center mt-2'>
                      <p>${item.price}</p>
                      <p className='bg-gray-200 px-4 py-2 cursor-pointer'>
                        {item.selectedSize}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Quantity & Delete */}
                <div className='flex gap-8 items-center'>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 border-gray-200'
                  />
                  <img
                    src={assets.bin_icon}
                    alt="Delete"
                    className='w-4 mr-4 sm:w-5 cursor-pointer h-5'
                    onClick={() => handleDelete(index)}
                  />
                </div>
              </div>
            ))
          )
        }
      </div>
      {/* cart total */}
      <div className='flex justify-end my-20'>
        <div className='mt-15 w-full sm:w-[450px]'>
          <p className='text-gray-500 font-medium text-3xl mb-3'>
            CART <span className='text-gray-700'>TOTAL</span>
          </p>
          <p
            className='flex gap-30 max-sm:gap-20 mt-2 text-md  border-b border-gray-300 py-2 items-center'>
            <span>Subtotal</span>
            <span>{totalPrice} $</span>
          </p>
          <p className='flex gap-30 max-sm:gap-20 mt-2 text-md  border-b border-gray-300 py-2 items-center'>
            <span>Shipping Fee</span>
            <span>10 $</span>
          </p>
          <p
            className='flex gap-30 max-sm:gap-20 mt-2 text-lg py-5 items-center'>
            <b>Total</b>
            <b>{totalPrice + 10} $</b>
          </p>
          <div className="w-full text-end" >
            <button
              className='bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer'
              onClick={checkout}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
