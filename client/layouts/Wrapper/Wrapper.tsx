import { Box, BoxProps, styled } from '@mui/material'
import React from 'react'
import Header from '../Header/Header'


const WrapperStyle = styled(Box)`
    
`

const Wrapper:React.FC<BoxProps> = ({...props}) => {
  return (
    <WrapperStyle {...props}>
        <Header/>
        {props?.children}
    </WrapperStyle>
  )
}

export default Wrapper