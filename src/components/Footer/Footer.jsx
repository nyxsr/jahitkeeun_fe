import React from 'react'
import { FooterWrapper } from './style'
import logo from '../../assets/logo.svg'

function Footer() {
  return (
    <FooterWrapper>
        <p>Copyright &copy; Jahitkeeun {new Date().getFullYear() }</p>
    </FooterWrapper>
  )
}

export default Footer