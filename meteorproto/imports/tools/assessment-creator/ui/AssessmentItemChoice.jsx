"use strict";

import mod_assert from 'assert-plus';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { TextField, Checkbox } from 'material-ui';
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
            <div className="fields">
              <div className="field is-correct">
                <Checkbox
                  checked={this.state.isCorrect}
                  onCheck={this.handleIsCorrectChange} />
              </div>
              <div className="field answer">
                <TextField
                  value={this.state.answer}
                  onChange={this.handleAnswerChange}
                  onBlur={this.handleAnswerBlur} />
              </div>
              <div className="field delete">
                <button onClick={this.remove}>Delete</button>
              </div>
            </div> :
            null
        }
      </div>
    );
  },

  handleIsCorrectChange(event, isChecked) {
    this.setState({
      isCorrect: isChecked
    });
    this.props.updateIsCorrect(isChecked);
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