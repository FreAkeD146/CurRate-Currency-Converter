import React from 'react'
import logo from './currlogo.svg'
import PropTypes from 'prop-types'

console.log(logo)
function Navbar(props) {
  return (
    <>
    <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Logo" width="40" height="32" class="d-inline-block align-text-top" />
            {props.title}
          </a>
          <span class="navbar-text">
          An Online Currency Converter
          </span>
        </div>
    </nav>  
    </>
  );
}

export default Navbar;

Navbar.propTypes = {
    title: PropTypes.string
}
