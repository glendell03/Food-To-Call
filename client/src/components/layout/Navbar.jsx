import React from "react";
import "../../assets/scss/navbar.scss";
import { Link } from "react-router-dom";

import AuthOption from "../auth/AuthOptions";
import { ReactComponent as Logo } from "../../assets/images/logo.svg";

import { RiSearchLine, RiStore2Line } from "react-icons/ri";

class Navbar extends React.Component {
  state = {
    navBackground: "",
    prevScrollpos: window.pageYOffset,
  };

  componentDidMount() {
    document.addEventListener("scroll", () => {
      const backgroundColor = window.scrollY < 100 ? "" : "#151515";

      this.setState({ navBackground: backgroundColor });
    });
    window.onscroll = () => {
      let currentScrollPos = window.pageYOffset;
      if (this.state.prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-80px";
      }
      this.setState({
        prevScrollpos: currentScrollPos,
      });
    };
  }

  render() {
    return (
      <nav
        className="navbar"
        id="navbar"
        style={{
          backgroundColor: `${this.state.navBackground}`,
          transition: "0.5s ease",
          position: "fixed",
          width: "100%",
          top: "0",
          left: "0",
        }}
      >
        <div className="nav-links">
          {" "}
          <Link to="/">HOME</Link>
          <Link to="/menu">MENU</Link>
          <Link to="/about">ABOUT</Link>
        </div>

        <div className="logo-container">
          <Link to="/">
            <Logo className="logo" />
          </Link>
        </div>
        <div className="left-menu">
          <RiSearchLine className="search-icon" />
          <RiStore2Line className="store-icon" />
          <AuthOption />
        </div>
      </nav>
    );
  }
}

export default Navbar;
