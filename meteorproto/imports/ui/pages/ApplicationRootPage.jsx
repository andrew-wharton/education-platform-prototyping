import React from 'react';
import { Meteor } from 'meteor/meteor';
import { HeaderContainer } from '/imports/ui/components/Header.jsx';
import { Footer } from '/imports/ui/components/Footer.jsx';
import './ApplicationRootPage.less';

/**
 * Created by andrewwharton on 24/08/15.
 */
export const ApplicationRootPage = React.createClass({

  render() {
    return (
      <div>
        <HeaderContainer />
        <div className="main-content">
          {
            this.props.children
          }
        </div>
        <Footer />
      </div>
    );
  }

});