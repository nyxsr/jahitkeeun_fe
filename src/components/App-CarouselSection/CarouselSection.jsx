import React from 'react'
import { useSelector } from 'react-redux';
import ReactSwipe from 'react-swipe'

const CarouselSection = () => {
  let reactSwipeEl;
  const { image } = useSelector(state => state.imageSlide)


  // setInterval(() => {
  //   reactSwipeEl.next()
  // }, 3000);
  return (
<div className='px-10 py-5'>
<ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: true }}
        ref={el => (reactSwipeEl = el)}
      >
        {image.map((v,i)=>{
          return(
          <img key={i} src={v} alt="" className='w-5 rounded-md' />
          )
        })}
      </ReactSwipe>
</div>
  )
}

export default CarouselSection