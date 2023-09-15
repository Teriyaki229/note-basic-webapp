import React, { Component } from "react";
import "./styles.css";

class HeaderComponent extends Component {
  /**
   * Render method for the component.
   * @returns The JSX code for rendering the component.
   */
  render() {
    return (
      <div>
        <nav className="headerNavBar">
          <h1>
            <a href="/" style={{ textDecoration: "none", color: "hsl(47, 100%, 48%)", fontSize: "47px"}}>
              Taking Notes
            </a>
          </h1>
        </nav>
      </div>
    );
  }
}

export default HeaderComponent;
