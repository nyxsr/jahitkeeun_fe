import React from 'react'
import ReactSwipe from 'react-swipe'

const CarouselSection = () => {
  let reactSwipeEl;
  const image1 = 'https://source.unsplash.com/300x200?technology'
  const image2 = 'https://source.unsplash.com/300x199?technology'
  const image3 = 'https://source.unsplash.com/300x198?technology'

  setInterval(() => {
    reactSwipeEl.next()
  }, 3000);
  return (
<div className='px-10 py-5'>
<ReactSwipe
        className="carousel"
        swipeOptions={{ continuous: true }}
        ref={el => (reactSwipeEl = el)}
      >
        <img src={image1} alt="" className='w-5 rounded-md' />
        <img src={image2} alt="" className='w-5 rounded-md'/>
        <img src={image3} alt="" className='w-5 rounded-md'/>
      </ReactSwipe>
</div>
  )
}

export default CarouselSection