import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-scroll";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: "not",
      sidenav_switch: false,
    };
    this.closeSideBar = this.closeSideBar.bind(this);
  }
  closeSideBar() {
    this.bar_toggle();
  }

  bar_toggle(x) {
    setTimeout(() => {
      let oak = ReactDOM.findDOMNode(this.refs.NES);
      oak.classList.toggle("change");
      if (this.state.sidenav_switch === true) {
        this.setState({ sidenav_switch: false });
      } else {
        this.setState({ sidenav_switch: true });
      }
    }, 300);
  }

  render() {
    return (
      <div className="Navbar  border-warning">
        <div className="vaternal ">
          <div className="Logo">
            <div className="logo balm">Y</div>
            <div className="logo_name ">
              <div className="ben">Your</div>
              <div className="smith text-muted">Name</div>
            </div>
          </div>

          <div className="nav_links  ml-auto lg-show">
            <div className="link ">
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-link"
                to="home"
              >
                Home
              </Link>
              <div className="link-line " />
            </div>
            <div className="link">
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-link"
                to="service"
              >
                Services
              </Link>
              <div className="link-line " />
            </div>
            <div className="link">
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-link"
                to="portfolio"
              >
                Portfolio
              </Link>
              <div className="link-line " />
            </div>
            <div className="link">
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-link"
                to="testimonial"
              >
                Testimonies
              </Link>
              <div className="link-line " />
            </div>
            {/* <div className="link">
              <Link
                activeClass="active"
                
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-link"
                to="aboutme"
              >
                About Me
              </Link>
              <div className="link-line " />
            </div> */}
            <div className="link">
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="contact"
                className="text-link"
              >
                Contact
              </Link>
              <div className="link-line " />
            </div>
          </div>

          <div className={`sidebar  ml-auto sm-show`}>
            <div
              ref="NES"
              onClick={this.bar_toggle.bind(this)}
              className=" container mx-0 mt-1 px-0"
            >
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>

            <div
              className={`sidebar_links white sm-show ${this.state.sidenav_switch}`}
            >
              <div className="link">
                <Link
                  onClick={this.closeSideBar}
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-link"
                  to="home"
                >
                  Home
                </Link>
                <div className="link-line " />
              </div>
              <div className="link">
                <Link
                  onClick={this.closeSideBar}
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-link"
                  to="services"
                >
                  Services
                </Link>
                <div className="link-line " />
              </div>
              <div className="link">
                <Link
                  onClick={this.closeSideBar}
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-link"
                  to="portfolio"
                >
                  Portfolio
                </Link>
                <div className="link-line " />
              </div>
              {/* <div className="link">
                <Link
                  onClick={this.closeSideBar}
                  activeClass="active"
                  
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-link"
                  to="aboutme"
                >
                  About Me
                </Link> 
                <div className="link-line " />
              </div>
            */}
              <div className="link">
                <Link
                  onClick={this.closeSideBar}
                  activeClass="active"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="text-link"
                  to="contact"
                >
                  Contact
                </Link>
                <div className="link-line " />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
