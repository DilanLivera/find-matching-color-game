import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css'

const Navbar = ({onNewGame}) => (
  <header>
    <div class="nav-container">
      <h2><a>FindMatchingColor</a></h2>
      <nav>
        <li><a onClick={ onNewGame }>New Game</a></li>
      </nav>
    </div>
  </header>
);

Navbar.propTypes = {
  onNewGame: PropTypes.func.isRequired
}
export default Navbar;