import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {
  const { orders, setOrders, setToken } = useContext(AppContext)
  const navigate = useNavigate()


  const storedData = localStorage.getItem("userData")
  const userData = storedData ? JSON.parse(storedData) : null


  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId)
    setOrders(updatedOrders)
  }

  const logout = () => {
    setToken(false);
    Swal.fire({
      title: "Logout!",
      text: "Logout From Your Account successfully!",
      icon: "success",
      confirmButtonColor: '#000000'
    });
    navigate('/login')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className='flex justify-between items-center'>
        <h1 className="text-3xl font-semibold text-gray-500 mb-6 max-md:text-2xl">
          {userData ? userData.name.toUpperCase() : "USER"} <span className="text-gray-900">ORDERS</span>
        </h1>

        <button
          onClick={logout}
          className='bg-black text-white px-4 h-10 text-sm active:bg-gray-700 rounded-md'>
          LOGOUT
        </button>
      </div>

      {orders && orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded p-4 shadow-sm relative">
              <button
                onClick={() => handleDeleteOrder(order.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-2 cursor-pointer rounded hover:bg-red-600"
              >
                Delete
              </button>

              <p className="text-lg font-medium mb-2">
                Order ID: <span className="font-normal">{order.id}</span>
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Date: <span className="font-normal">{order.date}</span>
              </p>

              <div className="mb-2">
                <p className="font-semibold">Delivery information :</p>
                <p>{order.deliveryInfo.firstName} {order.deliveryInfo.lastName}</p>
                <p>{order.deliveryInfo.email}</p>
                <p>{order.deliveryInfo.street}, {order.deliveryInfo.city}, {order.deliveryInfo.state}</p>
                <p>{order.deliveryInfo.zipcode}, {order.deliveryInfo.country}</p>
                <p>Phone: {order.deliveryInfo.phone}</p>
              </div>

              <div>
                <p className="font-semibold mb-1">Categories:</p>
                <ul className="list-none text-gray-700 space-y-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-4 border-t border-b my-5 border-gray-200 p-2 rounded">
                      <img
                        src={item.image[0]}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.price} $</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-3 font-semibold">Total: {order.total} $</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No Orders Yet</p>
      )}
    </div>
  )
}

export default MyProfile
