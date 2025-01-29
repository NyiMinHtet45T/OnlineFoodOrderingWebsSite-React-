import React, { useEffect } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { topMeels } from './TopMeel';
import CarouselItem from './CarouselItem';
import { useDispatch, useSelector } from 'react-redux';


export default function MultiItemCarousel() {

   const setting = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false
   }


  return (
    <div>
         <Slider {...setting}>
            {
               topMeels.map((item) => (<CarouselItem
               image={item.image} title={item.title}/>))
            }
         </Slider>
    </div>
  )
}
