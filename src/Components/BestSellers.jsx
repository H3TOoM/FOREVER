import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom';


const BestSellers = () => {
    const { products } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className='py-10'>
            <p className='text-gray-500 font-medium text-3xl text-center mb-3'>BEST <span className='text-gray-700'>SELLERS</span></p>
            <p className='text-gray-700 text-center mt-3'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
            </p>
            <div className='grid grid-cols-4 gap-8 mt-10 text-sm max-md:grid-cols-3 max-sm:grid-cols-2'>
                {
                    products.slice(0, 4).map((item, _id) => {
                        if (item.bestseller === true) {
                            return (
                                <div
                                    key={item._id}
                                    className="cursor-pointer text-gray-500 flex flex-col gap-2 hover:translate-y-[-5px] transition-all duration-500"
                                    onClick={() => navigate(`/product/${item._id}`)}>
                                    <img
                                        src={item.image[0]}
                                        className={`mb-3 ${item.category === "Women" && "blur-sm"}`}
                                        alt={item.name} />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                </div>
                            )
                        }
                        return null;
                    })
                }
            </div>
        </div>
    )
}

export default BestSellers