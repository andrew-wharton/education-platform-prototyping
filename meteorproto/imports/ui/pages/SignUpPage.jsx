"use strict";

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { TextField, Checkbox, RaisedButton } from 'material-ui';
import { Accounts } from 'meteor/accounts-base';
import './SignUpPage.less';

export const SignUpPage = React.createClass({

  getInitialState() {
    return {
      email: '',
      password: ''
    }
  },

  render() {
    return (
      <div className="SignUpPage">
        <div className="login-box">
          <h1>Sign Up</h1>
          <div className="field email">
            <TextField
              floatingLabelText="Email"
              value={this.state.email}
              onChange={this.handleFieldChange.bind(this, 'email')} />
          </div>
          <div className="field password">
            <TextField
              floatingLabelText="Password"
              type="password"
              value={this.state.password}
              onChange={this.handleFieldChange.bind(this, 'password')} />
          </div>
          <div className="sign-up-button">
            <RaisedButton
              label="Create Account"
              primary={true}
              onClick={this.createUser} ></RaisedButton>
          </div>
        </div>
      </div>
    );
  },

  handleFieldChange(field, event) {
    var state = {};
    state[field] = event.target.value;
    this.setState(state);
  },

  createUser(event) {

    this.props.createUser({
      email: this.state.email,
      password: this.state.password
    }, function(err) {
      if(err) {
        alert(err);
      } else {
        browserHistory.push("/");
      }
    })
  }

});

export const SignUpPageContainer = createContainer(function(props) {

  return {
    createUser(opts, callback) {
      Accounts.createUser(opts, callback)
    }
  }

}, SignUpPage);