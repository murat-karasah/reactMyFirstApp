import { format } from '@fluentui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {Layer,getTheme,FontIcon} from '@fluentui/react'
import "./header.css"

export default function Header() {
  const theme = getTheme();
  const contentStyle={
  backgroundColor:theme.palette.themePrimary,
  color:theme.palette.white,
  lineHeight:"50px"
  }
  const content = (
    <div style={contentStyle}>
      <div className='ms-Grid' dir='ltr'>
        <div className='ms-Grid-row'>
          <Link to={"/book"} className='header-text'>Book</Link>
          <Link to={"/carts"} className='header-button'>
          <FontIcon iconName='ShoppingCart'/>
          </Link>
        </div>
      </div>
    </div>
  )
  return (
  <Layer>
    {content}
  </Layer>
  )
}
