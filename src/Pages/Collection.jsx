import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';


const Collection = () => {
  const { products, search, showSearch } = useContext(AppContext);
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  // useEffect(() => {
  //   setFilterProducts(products);
  // }, [])



  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy);
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch])

  // useEffect(() => {
  //   console.log(subCategory);
  // }, [subCategory])


  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price))
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price))
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300'>
      {/* Filter Option */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ""}`} src={assets.dropdown_icon} alt="dropdown" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium uppercase'>Categories</p>
          <div className="flexflex-col gap-2 text-sm font-light text-gray-700">
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Men"} onChange={toggleCategory} />Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Women"} onChange={toggleCategory} />Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Kids"} onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium uppercase'>Type</p>
          <div className="flexflex-col gap-2 text-sm font-light text-gray-700">
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Topwear"} onChange={toggleSubCategory} />Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} />Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} />Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <p>
            ALL <span className="text-gray-700 font-medium">COLLECTIONS</span>
          </p>
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
            <option value={"relavent"}>Sort By: Relavent</option>
            <option value={"low-high"}>Sort By: Low to High</option>
            <option value={"high-low"}>Sort By: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-4 gap-5 gap-y-6 mt-8 md:grid-cols-3 max-sm:grid-cols-2">
          {
            filterProducts.map((item, index) => (
              <div
                key={item._id}
                className="cursor-pointer text-gray-500 flex flex-col gap-2 hover:translate-y-[-5px] transition-all duration-500 text-md"
                onClick={() => {
                  navigate(`/product/${item._id}`);
                  scrollTo(0, 0)
                }}
              >
                <img
                  src={item.image[0]}
                  className={`mb-3 ${item.category === "Women" && "blur-sm"}`} />
                <p>{item.name}</p>
                <b>${item.price}</b>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection