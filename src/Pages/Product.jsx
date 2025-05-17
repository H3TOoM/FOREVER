import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';
import Reviews from '../Components/Reviews';
import RelatedProducts from '../Components/RelatedProducts';


const Product = () => {
  const { _id } = useParams();
  const { cartNum, setCartNum, products, selectedItems, setSelectedItems } = useContext(AppContext);
  const [selectedSize, setSelectedSize] = useState('');


  const addToCart = () => {
    if (selectedSize === '') {
      Swal.fire({
        title: 'Error!',
        text: 'Select size to confirm!',
        icon: 'error',
        confirmButtonText: 'Close',
        confirmButtonColor: '#000000',
      });
      return;
    }

    const newItem = { ...product, selectedSize, quantity: 1 };
    const updatedItems = [...selectedItems, newItem];

    setSelectedItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    setCartNum(cartNum + 1);

    Swal.fire({
      title: 'Success',
      text: 'Added to the shopping cart',
      icon: 'success',
      confirmButtonText: 'Close',
      confirmButtonColor: '#000000',
    });
    setSelectedSize('');
  }

  const product = products.find(p => p._id === _id)

  // useEffect(()=> {
  //   console.log(selectedItems);
  // },[selectedItems])

  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setSelectedItems(JSON.parse(storedItems));
    }
  }, []);

  return (
    <div>
      <div className='grid grid-cols-2 max-md:grid-cols-1 border-t-1 border-gray-400 pt-10 gap-8 mb-15'>
        {/* Left section */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex flex-col gap-2'>
            {
              product.image.map((img) => (
                <img
                  src={img}
                  alt={product.name}
                  className={`w-30 h-30 ${product.category === "Women" && "blur-sm"}`} />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img
              src={product.image[0]}
              alt={product.name}
              className={`${product.category === "Women" && "blur-sm"}`} />
          </div>
        </div>

        {/* Right section */}
        <div className='flex flex-col gap-5 mb-5'>
          <p className='font-medium text-2xl mt-2'>
            {product.name}
          </p>
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <img
                key={index}
                src={assets.star_icon}
                alt="star" />
            ))}
            <span>(122)</span>
          </div>
          <div>
            <b className='mt-5 text-3xl font-medium'>${product.price}</b>
            <p className='mt-3 text-gray-500'>{product.description}</p>
          </div>

          <div className='flex flex-col gap-5'>
            <b>Select Size</b>
            <div className='flex items-center gap-5'>
              {
                product.sizes.map((size) => (
                  <div
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`bg-gray-200 px-4 py-2 cursor-pointer ${selectedSize === size ? "border border-yellow-600" : ""}`}>{size}</div>
                ))
              }
            </div>
          </div>
          <button
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 w-40 mt-5 cursor-pointer'
            onClick={addToCart}>
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5 border-0 h-[1px] bg-gray-300' />
          <div className='text-sm text-gray-500'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <Reviews />
      <RelatedProducts product={product} id={_id} />
    </div>
  )
}

export default Product;