import React from 'react';
import { Link } from 'react-router';
import './MainToolBar.less';

/**
 * Created by andrewwharton on 30/07/15.
 */
export const MainToolBar = React.createClass({

  render() {
    return (
      <nav className="main-tool-bar">
        <Link to="/">
          <div>Dashboard</div>
        </Link>
        <Link to="/planning">
          <div>Planning</div>
        </Link>
        <Link to="/presentation">
          <div>Presentation</div>
        </Link>
        <Link to="/reporting">
          <div>Reporting</div>
        </Link>
      </nav>
    );
  }

});