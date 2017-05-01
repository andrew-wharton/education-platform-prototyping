"use strict";

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import './SignUpPage.less';

export const SignUpPage = React.createClass({

  render() {
    return (
      <div className="SignUpPage">
        <div className="login-box">
          <h1>Sign Up</h1>
          <div className="username">

          </div>
          <div className="password">

          </div>
        </div>
      </div>
    );
  }

});

export const SignUpPageContainer = createContainer(function(props) {

  return {

  }

}, SignUpPage);