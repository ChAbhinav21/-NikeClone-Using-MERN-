import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Navbar'
import Footer from '../components/landingpage/Footer'
import ProductOverview from '../components/ProductOverview'
import { useParams } from 'react-router-dom'

function ProductOverviewPage( ) {
  const params = useParams()
  const id = params.id
  return (
    <div> 
        <Navbar/> 
        <ProductOverview id={id}/>
        <Footer /> 

    </div>
  )
}

// ProductOverviewPage.propTypes = {} 

export default ProductOverviewPage
