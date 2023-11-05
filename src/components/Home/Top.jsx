import React from 'react'
import shop1 from "../../assets/images/shop01.webp";
import shop2 from "../../assets/images/shop02.webp";
import shop3 from "../../assets/images/shop03.webp";
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
const Top = () => {
  return (
    <div className="section py-5">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-4  col-sm-6 col-xs-12">
              <div className="shop">
                <div className="shop-img">
                  <img loading="lazy" alt=" img" src={shop1} />
                </div>
                <div className="shop-body">
                  <h3>
                    Laptop
                    <br />
                    Collection
                  </h3>
                  <Link to="/store" className="cta-btn">
                    Shop now
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="shop">
                <div className="shop-img">
                  <img loading="lazy" alt=" img" src={shop2} />
                </div>
                <div className="shop-body">
                  <h3>
                    Accessories
                    <br />
                    Collection
                  </h3>
                  <Link to="/store" className="cta-btn">
                    Shop now <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="shop">
                <div className="shop-img">
                  <img loading="lazy" alt=" img" src={shop3} />
                </div>
                <div className="shop-body">
                  <h3>
                    Cameras
                    <br />
                    Collection
                  </h3>
                  <Link to="/store" className="cta-btn">
                    Shop now <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Top