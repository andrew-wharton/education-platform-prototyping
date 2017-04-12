"use strict";

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { AssessmentItemType }
  from '/imports/api/assessment-item/AssessmentItemType.js'
import AssessmentItemMongoCollection
  from '/imports/api/assessment-item/AssessmentItemMongoCollection';
import { AssessmentItemChoiceContainer } from './AssessmentItemChoice.jsx';
import './AssessmentItemEditor.less';

/**
 *
 */
const AssessmentItemEditor = React.createClass({

  componentWillReceiveProps(props) {
    this.setState({
      question: props.assessmentItem.question
    })
  },

  getInitialState() {
    return {
      question: this.props.assessmentItem.question,
      toAdd_answer: "",
      toAdd_isCorrect: false
    }
  },

  render() {
    return (
      <div className="AssessmentItemEditor">
        {
          this.props.assessmentItemsReady ?
            this.props.assessmentItem ?
              this.renderEditor() :
              null :
            "Loading..."
        }
      </div>
    );
  },

  renderEditor() {

    var item = this.props.assessmentItem;

    return (
      <div>
        {
          item.type === AssessmentItemType.MULTIPLE_CHOICE ?
            <label className="question">
              Question:
              <input
                value={this.state.question}
                onChange={this.handleQuestionChange}
                onBlur={this.handleQuestionBlur} />
            </label> :
            null
        }
        {
          item.type === AssessmentItemType.MULTIPLE_CHOICE ?
            <div className="choices">
              <div>Choices</div>
              {
                item.choices.map(this.renderChoice)
              }
              {
                this.renderAddChoice()
              }
            </div> :
            null
        }
      </div>
    );
  },

  renderChoice(choice) {
    return (
      <AssessmentItemChoiceContainer
        key={choice.identifier}
        assessmentItemId={this.props.assessmentItem._id}
        choice={choice} />
    );
  },

  renderAddChoice() {
    return (
      <div>
        <div>Add a choice</div>
        <input
          type="checkbox"
          checked={this.state.toAdd_isCorrect}
          onChange={this.handleToAddIsCorrectChange} />
        <input
          value={this.state.toAdd_answer}
          onChange={this.handleToAddAnswerChange} />
        <button
          onClick={this.addChoice}>Add choice</button>
      </div>
    );
  },

  handleQuestionChange(event) {
    this.setState({
      question: event.target.value
    })
  },

  handleQuestionBlur() {
    this.props.updateAssessmentItemQuestion(this.state.question)
  },

  handleToAddIsCorrectChange(event) {
    this.setState({
      toAdd_isCorrect: event.target.checked
    })
  },

  handleToAddAnswerChange(event) {
    this.setState({
      toAdd_answer: event.target.value
    })
  },

  addChoice() {

    var self = this;
    var choiceToAdd = {
      answer: this.state.toAdd_answer,
      isCorrect: this.state.toAdd_isCorrect
    };

    this.props.addChoice(choiceToAdd, function(err) {
      if(err) {
        console.error(err);
      } else {
        self.setState({
          toAdd_answer: "",
          toAdd_isCorrect: false
        });
      }
    })

  }

});

/**
 *
 */
export const AssessmentItemEditorContainer = createContainer(function (props) {

  return {
    assessmentItem: AssessmentItemMongoCollection.findOne({
      _id: props.assessmentItemId
    }),
    updateAssessmentItemQuestion(newValue, callback) {
      Meteor.call(
        "tools/assessment-creator/updateAssessmentItemQuestion",
        props.assessmentItemId,
        newValue,
        callback
      )
    },
    addChoice(choice, callback) {
      Meteor.call(
        "tools/assessment-creator/addChoiceToAssessmentItem",
        props.assessmentItemId,
        choice,
        callback
      )
    }
  };

}, AssessmentItemEditor);

export default AssessmentItemEditor;