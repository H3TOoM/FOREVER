import React from 'react'
import { assets } from '../assets/assets'

const Services = () => {
    return (
        <div className='grid grid-cols-3 gap-5 text-center mt-15 max-md:grid-cols-1'>
            <div className='flex flex-col justify-center items-center'>
                <img src={assets.exchange_icon} className='w-12 mb-4' />
                <p>Easy Exchange Policy</p>
                <p className='text-gray-500 font-medium'>We offer hassle free exchange policy</p>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <img src={assets.quality_icon} className='w-12 mb-4' />
                <p>7 Days Return Policy</p>
                <p className='text-gray-500 font-medium'>We provide 7 days free return policy</p>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <img src={assets.support_img} className='w-12 mb-4' />
                <p>Best customer support</p>
                <p className='text-gray-500 font-medium'>we provide 24/7 customer support</p>
            </div>
        </div>
    )
}

export default Services