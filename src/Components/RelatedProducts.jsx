import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../Context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';

const RelatedProducts = ({ product, id }) => {
    const { products } = useContext(AppContext)
    const navigate = useNavigate()
    const [relPro, setRelPro] = useState([]);

    useEffect(() => {
        if (products.length > 0 && product.category) {
            const productData = products.filter(
                (pro) => pro.category === product.category && pro._id !== id
            );
            setRelPro(productData);
        }
    }, [products, product.category, id]);

    return (
        <div className='py-20'>
            <div className='m-auto flex justify-center items-center gap-2'>
                <p className='text-gray-500 font-medium text-3xl'>
                    RELATED <span className='text-gray-700'>PRODUCTS</span>
                </p>
                <p className="w-10 h-0.5 bg-gray-600"></p>
            </div>

            <div className='grid grid-cols-5 max-md:grid-cols-2 md:grid-col-2 mt-8 gap-5'>
                {
                    relPro.slice(0, 5).map((item) => (
                        <div
                            key={item._id}
                            className="cursor-pointer text-gray-500 flex flex-col gap-2 hover:translate-y-[-5px] transition-all duration-500 text-md"
                            onClick={() => { navigate(`/product/${item._id}`); scrollTo(0, 0) }}>
                            <img
                                src={item.image[0]}
                                className={`mb-3 ${item.category === "Women" && "blur-sm"}`} />
                            <p>
                                {item.name}
                            </p>
                            <b>
                                ${item.price}
                            </b>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts