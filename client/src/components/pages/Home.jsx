import React from "react";
import "../../assets/scss/home.scss";

import { Link } from "react-router-dom";
import aboutPic from "../../assets/images/aboutPic.png";

import { HiOutlineArrowNarrowRight, HiOutlineMail } from "react-icons/hi";
import { RiFacebookBoxLine, RiInstagramLine } from "react-icons/ri";
export default function Home() {
  return (
    <div className="home">
      <div className="hero-image">
        <div className="hero-content">
          <span className="hero-title">FOOD TO CALL</span>
          <span className="hero-subtitle">CALL. EAT. DRINK.</span>
          <Link to="/menu" className="hero-link">
            VIEW MENU <HiOutlineArrowNarrowRight className="right-arrow" />
          </Link>
        </div>
        <div className="social-container">
          <a href="https://www.facebook.com/FOODTOCALL">
            <RiFacebookBoxLine className="social" />
          </a>
          <a href="https://www.instagram.com/foodtocall/?hl=en">
            {" "}
            <RiInstagramLine className="social" />
          </a>
          <HiOutlineMail className="social" />
        </div>
      </div>

      <div className="about">
        <img src={aboutPic} alt="aboutPic" />
        <div className="about-content">
          <h1 className="about-title">ABOUT US</h1>
          <p className="about-p">
            Food to Call is a regional-based homemade food retailing business
            that offers a varied selection of foods. The products are freshly
            cooked and made. Moreover, Food to Call strives to give a phone call
            away experience to satisfy the cravings of the customers.
          </p>
          <Link to="/about" className="about-link">
            LEARN MORE <HiOutlineArrowNarrowRight className="right-arrow" />
          </Link>
        </div>
      </div>
    </div>
  );
}
