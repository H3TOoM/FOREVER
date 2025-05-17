import React from 'react'

const Subscribe = () => {
    return (
        <div className='flex flex-col justify-center items-center my-30'>
            <p className='text-xl font-medium mb-2'>Subscribe now & get 20% off</p>
            <p className='text-medium text-gray-400 '>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <div className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input type="email" placeholder='Enter Your Email' className='w-full sm:flex-1 outline-none' />
                <button className='bg-black text-white text-xs px-10 py-4 cursor-pointer hover:opacity-95 transition-all duration-500'>SUBSCRIBE</button>
            </div>
        </div>
    )
}

export default Subscribe