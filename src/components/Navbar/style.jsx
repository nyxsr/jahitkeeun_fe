import { motion } from "framer-motion"
import styled from "styled-components"


export const NavWrap = styled.nav`
    background-color: ${props => props.app ? '#402E32': '#FAFAFA'};
    justify-content: ${props => props.auth ? 'center':'space-between'};
    padding-top: ${props => props.app ? '1rem':'0.5rem'};
`

export const MenuNav = styled(motion.div)`
display:flex;
flex-direction: column;
background-color: rgb(250,250,250);
>a{
    padding:1rem;
}
>a:hover{
    background:#F1C232;
}
`
