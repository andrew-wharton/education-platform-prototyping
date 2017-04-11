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
      isCorrect: this.props.choice.isCorrect,
      answer: this.props.choice.answer
    };
  },

  render() {
    return (
      <div className="AssessmentItemChoice">
        <input
          type="checkbox"
          checked={this.state.isCorrect}
          onChange={this.handleIsCorrectChange} />
        <input
          value={this.state.answer}
          onChange={this.handleAnswerChange}
          onBlur={this.handleAnswerBlur} />
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
  }

});

/**
 *
 */
export const AssessmentItemChoiceContainer = createContainer(function (props) {

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
    }
  };

}, AssessmentItemChoice);