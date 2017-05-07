"use strict";

import React from 'react';
import Modal from 'react-modal';
import { SignInContainer } from '../modals/SignIn.jsx';
import ModalDefaults from '../modals/ModalDefaults.js';

/**
 *
 */
export const SignInButton = React.createClass({

  getInitialState() {
    return {
      signInOpen: false
    }
  },

  render() {
    return (
      <div className="sign-in-button">
        <button
          onClick={this.openSignIn}>
          Log In
        </button>
        <Modal
          isOpen={this.state.signInOpen}
          onRequestClose={this.closeSignIn}
          style={ModalDefaults.modalStyle}>
          <SignInContainer
            closeHandler={this.closeSignIn} />
        </Modal>
      </div>
    );
  },

  openSignIn() {
    this.setState({
      signInOpen: true
    });
  },

  closeSignIn() {
    this.setState({
      signInOpen: false
    })
  }

});