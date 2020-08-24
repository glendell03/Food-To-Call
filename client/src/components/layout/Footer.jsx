import React from "react";
import "../../assets/scss/footer.scss";

import { Link } from "react-router-dom";
import LogoFooter from "../../assets/images/logo-footer.png";

import { HiOutlineMail } from "react-icons/hi";
import { RiFacebookBoxLine, RiInstagramLine } from "react-icons/ri";

const Footer = () => (
  <footer className="footer">
    <img src={LogoFooter} alt="logofooter" />

    <div className="footer-links">
      <Link to="/">HOME</Link>
      <Link to="/">MENU</Link>
      <Link to="/">ABOUT</Link>
      <Link to="/">PRIVACY POLICY</Link>
      <Link to="/">TERMS AND CONDITIONS</Link>
    </div>

    <div className="footer-social">
      <p>FOLLOW US ON</p>
      <a href="https://www.facebook.com/FOODTOCALL">
        <RiFacebookBoxLine className="social" />
      </a>
      <a href="https://www.instagram.com/foodtocall/?hl=en">
        <RiInstagramLine className="social" />
      </a>
      <a href="https://www.instagram.com/foodtocall/?hl=en">
        <HiOutlineMail className="social" />
      </a>
    </div>
  </footer>
);

export default Footer;
