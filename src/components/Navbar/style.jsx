import { motion } from "framer-motion"
import styled from "styled-components"
import tw from "tailwind-styled-components/dist/tailwind-styled-components.cjs"


export const NavWrapper = tw.nav`
bg-zinc-50
flex
items-center
px-5
lg:px-14
justify-between
> img{
    pt-5
}
`

export const ToggleNav = tw.div`
lg:hidden
border
rounded-sm
text-3xl
-mt-5
`

export const MenuNav = styled(motion.div)`
display:flex;
z-index: 50;
flex-direction: column;
background-color: rgb(250,250,250);
>a{
    padding:1rem;
}
>a:hover{
    background:#F1C232;
}
`