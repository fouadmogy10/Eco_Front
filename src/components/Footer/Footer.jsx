import React from 'react'
import { FaEnvelope, FaFacebook, FaGithub, FaGoogle, FaHouseMedical, FaInstagram, FaLinkedinIn, FaPhone, FaTwitter } from 'react-icons/fa6'
import logo from "../../assets/images/favicon.webp";
import "./footer.css"
import { Link } from 'react-router-dom';
function Footer() {
  return (
<>

  <footer
          className="text-center text-lg-start text-white"
          style={{"backgroundColor":" rgb(21 22 29)"}}
          >
    <section
             className="d-flex justify-content-center p-4"
             style={{"backgroundColor":" rgb(231 72 33)"}}
             >
     

      <div>
        <a href="!#" className="text-white me-4">
          <FaFacebook/>
        </a>
        <a href="!#" className="text-white me-4">
          <FaTwitter/>
        </a>
        <a href="!#" className="text-white me-4">
          <FaGoogle/>
        </a>
        <a href="!#" className="text-white me-4">
          <FaInstagram/>
        </a>
        <a href="!#" className="text-white me-4">
          <FaLinkedinIn/>
        </a>
        <a href="!#" className="text-white me-4">
          <FaGithub/>
        </a>
      </div>
    </section>

    <section className="">
      <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold" style={{color:"rgb(231 72 33)"}}><img loading="lazy"   src={logo} width={80} alt="eco" />ECO</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{"width": "60px", "backgroundColor":" #7c4dff"," height":" 2px"}}
                />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos facilis reiciendis maiores reprehenderit magnam dolores impedit, sapiente eum ipsam velit?
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold">Products</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{"width":" 60px"," backgroundColor":" #7c4dff"," height":" 2px"}}
                />
            <p>
              <Link to="/" className="text-white">Home</Link>
            </p>
            <p>
              <Link to="/contact" className="text-white">Contact</Link>
            </p>
            <p>
              <Link to="/cart" className="text-white">Cart</Link>
            </p>
          </div>

         

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold">Contact</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{"width":" 60px"," backgroundColor":" #7c4dff"," height":" 2px"}}
                />
            <p><FaHouseMedical/> New York, NY 10012, US</p>
            <p> <FaEnvelope/> info@example.com</p>
            <p> <FaPhone/> + 01 234 567 88</p>
          </div>
        </div>
      </div>
    </section>
  </footer>

</>
  )
}

export default Footer