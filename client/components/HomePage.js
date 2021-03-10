import React from 'react'
import {Link} from 'react-router-dom'

function HomePage() {
  return (
    <div className="logo">
      <div id="product-title">
        <h4 id="home-page-name">Types of Beers</h4>
        <div id="home-page">
          <div id="types">
            <Link to="/products">
              <img
                className="type-img"
                src="https://www.americancraftbeer.com/wp-content/uploads/2018/03/BrewDog-Pink-IPA.jpg"
                alt="IPAs"
                style={({width: '200px'}, {height: '200px'})}
              />
              IPAs
            </Link>
          </div>
          <div id="types">
            <Link to="/products">
              <img
                className="type-img"
                src="https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/beveragedaily.com/news/markets/india-pale-lagers-carve-out-a-niche-in-craft-beer/9160143-1-eng-GB/India-Pale-Lagers-carve-out-a-niche-in-craft-beer_wrbm_large.jpg"
                alt="Lagers"
                style={({width: '200px'}, {height: '200px'})}
              />
              Lagers
            </Link>
          </div>
          <div id="types">
            <Link to="/products">
              <img
                className="type-img"
                src="https://s3-ap-southeast-2.amazonaws.com/www.beerandbrewer.com/wp-content/uploads/sites/2/2019/07/04163928/Stout-pic.jpg"
                alt="Stouts"
                style={({width: '200px'}, {height: '200px'})}
              />
              Stouts
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomePage
