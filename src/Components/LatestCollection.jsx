import React, { useContext } from 'react';
import { AppContext } from "../Context/AppContext";
import { useNavigate, useParams } from 'react-router-dom';

const LatestCollection = () => {
  const { products } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className='py-10'>
      <p className='text-gray-500 font-medium text-3xl text-center mb-3'>
        LATEST <span className='text-gray-700'>COLLECTIONS</span>
      </p>
      <p className='text-gray-700 text-center mt-3'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
      </p>

      <div className='grid grid-cols-5 gap-8 mt-10 text-sm max-md:grid-cols-3 max-sm:grid-cols-2'>
        {
          products.slice(0, 10).map((item, _id) => (
            <div
              key={item._id}
              className="cursor-pointer text-gray-500 flex flex-col gap-2 hover:translate-y-[-5px] transition-all duration-500 text-lg"
              onClick={() => navigate(`/product/${item._id}`)}>
              <img
                src={item.image[0]}
                className={`mb-3 ${item.category === "Women" && "blur-sm"}`}
              />
              <p>
                {item.name}
              </p>
              <p>
                ${item.price}
              </p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default LatestCollection;
