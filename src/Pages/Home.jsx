import React from 'react'

import Header from '../Components/Header'
import LatestCollection from '../Components/LatestCollection';
import BestSellers from '../Components/BestSellers';
import Services from '../Components/Services';
import Subscribe from '../Components/Subscribe';


const Home = () => {

  return (
    <div>
      <Header />
      <LatestCollection />
      <BestSellers />
      <Services />
      <Subscribe />
    </div>
  )
}

export default Home;