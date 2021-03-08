import React from 'react';
import beershopper from './public/beershopper.png';

function HomePage() {
  return (
    <div>
      <h1>Welcome to our Grace Hopper homepage! </h1>
      <h3>The hoppiest place on the web! </h3>
      <img
        src={beershopper}
        alt="beermagic"
        style={{width: '500px'}}
      />
    </div>
  )
}
export default HomePage
