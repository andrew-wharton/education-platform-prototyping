"use strict";

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { TextField, Checkbox } from 'material-ui';
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
            <TextField
              floatingLabelText="Question"
              value={this.state.question}
              onChange={this.handleQuestionChange}
              onBlur={this.handleQuestionBlur}
              fullWidth={true}
              multiLine={true} /> :
            null
        }
        {
          item.type === AssessmentItemType.MULTIPLE_CHOICE ?
            <div className="choices">
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
      <div className="add-choice">
        <div className="field is-correct">
          <Checkbox
            checked={this.state.toAdd_isCorrect}
            onCheck={this.handleToAddIsCorrectChange} />
        </div>
        <div className="field">
          <TextField
            value={this.state.toAdd_answer}
            onChange={this.handleToAddAnswerChange} />
        </div>
        <div className="field add">
          <button
            onClick={this.addChoice}>Add</button>
        </div>
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

  handleToAddIsCorrectChange(event, isChecked) {
    this.setState({
      toAdd_isCorrect: isChecked
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