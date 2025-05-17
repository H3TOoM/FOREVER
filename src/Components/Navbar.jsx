import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';

const Navbar = () => {

  const { cartNum, setShowSearch, token, setToken } = useContext(AppContext);
  const [showMenu, setMenu] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const checkToken = () => {
      const storedData = localStorage.getItem("userData")
      if (!storedData) {
        setToken(false)
        return;
      }
      try {
        const userData = JSON.parse(storedData)
        if (userData) {
          setToken(true)
        } else {
          setToken(false)
        }
      } catch (error) {
        setToken(false)
      }
    }
    checkToken();

    const handleStorageChange = () => {
      checkToken();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [])


  return (
    <div>
      <div className="flex items-center justify-between py-5 font-medium">
        <img
          src={assets.logo}
          alt="logo"
          className='w-36'
          onClick={() => navigate('/')}
        />
        {/* Links */}
        <nav className='hidden sm:flex gap-5 text-sm text-gray-700'>
          <NavLink className='flex flex-col items-center gap-1' to='/'>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>

          <NavLink className='flex flex-col items-center gap-1' to='/collection'>
            <p>COLLECTIONS</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>

          <NavLink className='flex flex-col items-center gap-1' to='/about'>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>

          <NavLink className='flex flex-col items-center gap-1' to='/contact'>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </NavLink>
        </nav>

        {/* icons */}
        <div className='flex items-center gap-6'>
          <NavLink to='/collection'>
            <img
              src={assets.search_icon}
              alt="search_icon"
              className='w-5 cursor-pointer'
              onClick={() => setShowSearch(true)} />
          </NavLink>

          <NavLink to={`${token ? '/myprofile' : '/login'}`}>
            <img
              src={assets.profile_icon}
              alt="profile_icon"
              className='w-5 cursor-pointer' />
          </NavLink>

          <NavLink to='/cart' className='relative'>
            <img
              src={assets.cart_icon}
              alt="cart_icon"
              className='w-5 cursor-pointer'
            />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
              {cartNum}
            </p>
          </NavLink>

          <img
            src={assets.menu_icon}
            alt=""
            className="w-6 md:hidden"
            onClick={() => setMenu(true)}
          />
        </div>
      </div>

      {/* Menu for mobile */}
      <div
        className={`${showMenu ? "fixed w-full h-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <img src={assets.logo} alt="logo" className="w-36" />
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setMenu(false)}
            className="w-7"
          />
        </div>
        <ul className="flex flex-col items-center gap-2 px-5 text-lg font-medium uppercase">
          <NavLink
            onClick={() => setMenu(false)}
            className="px-4 py-2 rounded inline-block"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setMenu(false)}
            className="px-4 py-2 rounded inline-block"
            to="/collection"
          >
            COLLECTIONS
          </NavLink>
          <NavLink
            onClick={() => setMenu(false)}
            className="px-4 py-2 rounded inline-block"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setMenu(false)}
            className="px-4 py-2 rounded inline-block"
            to="/contact"
          >
            Contact
          </NavLink>
        </ul>
      </div>
    </div>
  )
}

export default Navbar