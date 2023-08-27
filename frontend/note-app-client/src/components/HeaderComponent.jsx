import React, { Component } from "react";
import "./styles.css";

class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <nav className="headerNavBar">
          <h1>
            <a href="http://localhost:3000/" style={{ textDecoration: "none", color: "hsl(47, 100%, 48%)", fontSize: "47px"}}>
              Taking Notes
            </a>
          </h1>
        </nav>
      </div>
    );
  }
}

export default HeaderComponent;
