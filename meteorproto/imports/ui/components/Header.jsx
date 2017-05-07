"use strict";

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { SignInButton } from '/imports/ui/components/SignInButton.jsx';
import './Header.less';

/**
 *
 */
export const Header = React.createClass({

  render() {
    return (
      <header>
        <div className="user-status">
          {
            this.props.user ?
              this.renderUserFields() :
              <SignInButton />
          }
        </div>
      </header>
    );
  },

  renderUserFields() {
    return (
      <div>
        <div>
          <span>
            {
              this.props.user.emails[0].address
            }
          </span>
          <button onClick={this.logOut}>Log out</button>
        </div>
      </div>
    );
  },

  logOut(event) {
    Meteor.logout();
  }

});

/**
 * @fileOverview Data Container for SignInPage presentational component
 *
 */
export const HeaderContainer = createContainer(function (props) {

  return {
    user: Meteor.user()
  };

}, Header);