import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer_me ">
        <div className="socials flex ">
          <div className="facebook">Facebook</div>
          <div className="facebook">Twitter</div>
          <div className="facebook">Instagram</div>
        </div>
        <div className="rights">© 2021 All rights reserved. Staq Tech.</div>
      </div>
    );
  }
}
