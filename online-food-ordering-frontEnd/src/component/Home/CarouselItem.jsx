import React from 'react'

export default function CarouselItem({image, title}) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
         <img src={image} alt="" className="w-[100%] h-[10rem] lg:h-[14rem] lg:w-[14rem]
         rounded-full object-cover object-center" />
         <span className="py-5 font-bold text-xl text-gray-400">{title}</span>
      </div>
    </div>
  )
}
