import React from 'react'

function Footer() {
  return (
    <footer className='bg-[#402E32] flex flex-col py-10 text-zinc-50 justify-center items-center pb-28 md:pb-32 lg:pb-10'>
        <p>Copyright &copy; Jahitkeeun {new Date().getFullYear() }</p>
    </footer>
  )
}

export default Footer