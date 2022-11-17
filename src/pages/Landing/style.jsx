import styled from "styled-components";
import headerimage from '../../assets/header.png'
import tw from "tailwind-styled-components/dist/tailwind-styled-components.cjs";

export const HeaderWrapper = styled.header`
    background-image:url(${headerimage});
    background-size: cover;
    display: flex;
    background-repeat: no-repeat;
`

export const JoinUsSection = tw.section`
    bg-[#F1C232]
    relative
    py-10
    md:py-20
    scroll-m-28
    overflow-x-hidden
    overflow-y-hidden
`