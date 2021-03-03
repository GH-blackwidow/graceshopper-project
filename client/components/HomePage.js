import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

function HomePage() {
  return (
    <div>
      <h1>Welcome to our Grace Hopper homepage! </h1>
      <h3>The hoppiest place on the web! </h3>
      <img
        src="/public/beerpicture.jpg"
        alt="beermagic"
        style={{width: '500px'}}
      />
    </div>
  )
}
export default HomePage
