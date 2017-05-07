"use strict";

import React from 'react';
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import './SignIn.less';

/**
 *
 */
export const SignIn = React.createClass({

  getInitialState: function() {
    return {
      error: null
    }
  },

  render() {

    //<div className="password-reset">
    //  <Link to={"/password-reset"}>Forgot my password</Link>
    //</div>

    return (
      <div className="sign-in">
        <h2 className="major-sub-heading">Log in to your account</h2>

        <div className="form">
          <div>
            <TextField
              floatingLabelText="Email"
              hintText="user@example.com"
              ref={(i) => this.username_textField = i}
              fullWidth={true} />
          </div>
          <div>
            <TextField
              floatingLabelText="Password"
              type="password"
              ref={(i) => this.password_textField = i}
              fullWidth={true} />
          </div>

          {
            this.state.error ?
              this.renderError() : null
          }
          <div className="actions">
            <div className="buttons">
              <RaisedButton
                label="Log In"
                onClick={this.logIn}
                style={{margin: '1em'}} />
              <RaisedButton
                label="Cancel"
                onClick={this.props.closeHandler}
                style={{margin: '1em'}} />
            </div>
          </div>
        </div>
      </div>
    );
  },

  logIn: function() {

    var self = this;

    this.setState({
      error: null
    });

    console.log(this.password_textField);

    this.props.loginWithPassword(this.username_textField.getValue(), this.password_textField.getValue(), function handleLoginResult(err) {
      if(err) {
        self.password_textField.input.value = "";
        self.setState({
          error: err
        });
      } else {
        self.setState({
          error: null
        });
        self.props.closeHandler();
      }
    });

  },

  renderError: function() {
    return (
      <div className="error">
        Incorrect username or password
      </div>
    );
  }

});


/**
 * @fileOverview Data Container for SignInPage presentational component
 *
 */
export const SignInContainer = createContainer(function (props) {

  return {
    loginWithPassword: Meteor.loginWithPassword,
    closeHandler: props.closeHandler
  };

}, SignIn);