import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
function Header(props) {
  console.log("Header", props);

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <img id="logotype" src={props.logo} alt="nope" />
        </Link>
      </div>
      <ul className="header-menu">
        <span>
          {props.menu.map(item => (
            <li className="item-list" key={item.link}>
              <Link to={item.link}>{item.title}</Link>
            </li>
          ))}
        </span>
      </ul>
    </header>
  );
}

export default Header;
