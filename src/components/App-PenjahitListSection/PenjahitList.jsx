import React from 'react'
import {MdSort} from 'react-icons/md'
import PenjahitItem from './PenjahitItem'

function PenjahitList() {

  return (
    <>
    <div className="flex px-10 mt-5 justify-between">
        <p className='font-semibold text-2xl'>Penjahit Kami</p>
        <p className='flex'>Sort By <MdSort/></p>
    </div>
    <div className="mt-3 flex flex-col gap-5 pb-3">
       <PenjahitItem/>
       <PenjahitItem/>
       <PenjahitItem/>
       <PenjahitItem/>
    </div>
    </>
  )
}

export default PenjahitList