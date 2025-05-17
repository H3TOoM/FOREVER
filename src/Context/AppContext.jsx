import { createContext, useState } from "react";
import { products } from "../assets/assets";


export const AppContext = createContext();

import { useEffect } from "react";
const AppContextProvider = (props) => {


  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [selectedItems, setSelectedItems] = useState([{}]);
  const [token, setToken] = useState(null);

  const getInitialCartNum = () => {
    const stored = localStorage.getItem("cartNum");
    return stored ? JSON.parse(stored) : 0;
  };

  const [cartNum, setCartNum] = useState(getInitialCartNum);

  useEffect(() => {
    localStorage.setItem("cartNum", JSON.stringify(cartNum));
  }, [cartNum]);


  const storedOrders = localStorage.getItem('orders');
  const [orders, setOrders] = useState(storedOrders ? JSON.parse(storedOrders) : []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);


  const value = {
    products, showSearch,
    search, setSearch, setShowSearch,
    cartNum, setCartNum, selectedItems,
    setSelectedItems, orders, setOrders,
    token, setToken
  };



  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
};

export default AppContextProvider;
