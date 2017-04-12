"use strict";

import mod_assert from 'assert-plus';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import './AssessmentItemChoice.less';

/**
 *
 */
const AssessmentItemChoice = React.createClass({

  getInitialState() {
    return {
      isRemoved: false,
      isCorrect: this.props.choice.isCorrect,
      answer: this.props.choice.answer
    };
  },

  render() {
    return (
      <div className="AssessmentItemChoice">
        {
          !this.state.isRemoved ?
            <div>
              <input
                type="checkbox"
                checked={this.state.isCorrect}
                onChange={this.handleIsCorrectChange} />
              <input
                value={this.state.answer}
                onChange={this.handleAnswerChange}
                onBlur={this.handleAnswerBlur} />
              <button onClick={this.remove}>Delete</button>
            </div> :
            null
        }
      </div>
    );
  },

  handleIsCorrectChange(event) {
    this.setState({
      isCorrect: event.target.checked
    });
    this.props.updateIsCorrect(event.target.checked);
  },

  handleAnswerChange(event) {
    this.setState({
      answer: event.target.value
    })
  },

  handleAnswerBlur(event) {
    this.props.updateAnswer(this.state.answer);
  },

  remove(event) {
    this.setState({
      isRemoved: true
    });
    this.props.remove()
  }

});

/**
 *
 */
export const AssessmentItemChoiceContainer = createContainer(function (props) {

  mod_assert.string(props.assessmentItemId, 'props.assessmentItemId');
  mod_assert.object(props.choice, 'props.choice');

  return {
    updateIsCorrect(isCorrect, callback) {

      mod_assert.bool(isCorrect, 'isCorrect');
      mod_assert.optionalFunc(callback, 'callback');

      Meteor.call(
        "tools/assessment-creator/updateAssessmentItemChoiceIsCorrect",
        {
          assessmentItemId: props.assessmentItemId,
          choiceIdentifier: props.choice.identifier
        },
        isCorrect,
        callback
      )
    },
    updateAnswer(newValue, callback) {

      mod_assert.string(newValue, 'newValue');
      mod_assert.optionalFunc(callback, 'callback');

      Meteor.call(
        "tools/assessment-creator/updateAssessmentItemChoiceAnswer",
        {
          assessmentItemId: props.assessmentItemId,
          choiceIdentifier: props.choice.identifier
        },
        newValue,
        callback
      )
    },
    remove(callback) {

      Meteor.call(
        "tools/assessment-creator/removeAssessmentItemChoiceAnswer",
        {
          assessmentItemId: props.assessmentItemId,
          choiceIdentifier: props.choice.identifier
        },
        callback
      )
    }
  };

}, AssessmentItemChoice);