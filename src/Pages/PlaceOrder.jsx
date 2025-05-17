import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const PlaceOrder = () => {
  const { orders, setOrders } = useContext(AppContext)
  const totalPrice = localStorage.getItem("cartTotalPrice");
  const cartTotalPrice = JSON.parse(totalPrice)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted with data:", formData);

    // 1.Fetching data from local storage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // 2. make new order
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: cartTotalPrice,
      deliveryInfo: formData,
      date: new Date().toLocaleString(),
    };

    // 3. push new order to orders
    setOrders((prevOrders) => [...prevOrders, newOrder]);

    // 4. Delete data from localStorage
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartTotalPrice");

    // 5. navigate user to het profile
    navigate('/myprofile');
  };

  return (
    <form className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-300' onSubmit={handleSubmit}>
      {/* left side */}
      <div>
        <p className='mb-5 text-2xl'>
          DELIVERY  <span className="text-gray-700 font-semibold">INFORMATION</span>
        </p>
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='flex gap-3'>
            <input type="text" placeholder='First name'
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              required
              onChange={handleChange}
              value={formData.firstName}
              name='firstName'
            />
            <input type="text" placeholder='Last name'
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              required
              onChange={handleChange}
              value={formData.lastName}
              name='lastName'
            />
          </div>
          <input type="email" placeholder='Email address'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            required
            onChange={handleChange}
            value={formData.email}
            name='email'
          />
          <input type="text" placeholder='Street'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            required
            onChange={handleChange}
            value={formData.street}
            name='street'
          />
          <div className='flex gap-3'>
            <input type="text" placeholder='City'
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              required
              onChange={handleChange}
              value={formData.city}
              name='city'
            />
            <input type="text" placeholder='State'
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              required
              onChange={handleChange}
              value={formData.state}
              name='state'
            />
          </div>
          <div className='flex gap-3'>
            <input type="text" placeholder='Zipcode'
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              required
              onChange={handleChange}
              value={formData.zipcode}
              name='zipcode'
            />
            <input type="text" placeholder='Country'
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
              required
              onChange={handleChange}
              value={formData.country}
              name='country'
            />
          </div>
          <input type="text" placeholder='Phone'
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            required
            onChange={handleChange}
            value={formData.phone}
            name='phone'
          />
        </div>
      </div>

      {/* Right Side */}
      <div className='flex justify-end'>
        <div className='mt-10 w-full sm:w-[450px]'>
          <p className='text-gray-500 font-medium text-3xl mb-3'>
            CART <span className='text-gray-700'>TOTAL</span>
          </p>
          <p
            className='flex gap-30 max-sm:gap-20 mt-2 text-md  border-b border-gray-300 py-1 items-center'>
            <span>Subtotal</span>
            <span>{cartTotalPrice - 10} $</span>
          </p>
          <p className='flex gap-30 max-sm:gap-20 mt-2 text-md  border-b border-gray-300 py-1 items-center'>
            <span>Shipping Fee</span>
            <span>10 $</span>
          </p>
          <p
            className='flex gap-30 max-sm:gap-20 mt-2 text-lg py-5 items-center'>
            <b>Total</b>
            <b>{cartTotalPrice} $</b>
          </p>
          {/* Payment Methods */}
          <div>
            <p className='mb-2 text-xl'>
              PAYMENT  <span className="text-gray-700 font-semibold">METHODS</span>
            </p>
            <div className='flex gap-3 flex-col lg:flex-row'>
              <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-300'>
                <img src={assets.stripe_logo} alt="" />
              </div>
              <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-300'>
                <img src={assets.razorpay_logo} alt="" />
              </div>
              <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-300'>
                <p className='min-w-3.5 h-3.5 border rounded-full bg-green-400 border-gray-200'></p>
                <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
            </div>
            <div className="w-full text-end mt-5" >
              <button
                className='bg-black text-white text-sm my-2 px-8 py-3 cursor-pointer'
                type='submit'
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;