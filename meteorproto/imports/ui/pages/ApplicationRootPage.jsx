import React from 'react';
import { Header } from '/imports/ui/components/Header.jsx';

/**
 * Created by andrewwharton on 24/08/15.
 */
export const ApplicationRootPage = React.createClass({

  render() {
    return (
      <div>
        <Header />
        <div className="main-content">
          {
            this.props.children
          }
        </div>
        <footer>Footer</footer>
      </div>
    );
  }

});