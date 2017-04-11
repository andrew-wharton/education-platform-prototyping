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
      choiceToAdd: {
        answer: "",
        isCorrect: false
      }
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
          checked={this.state.choiceToAdd.isCorrect}
          onBlur={this.handleAddChoiceBlur.bind(this, 'isCorrect')} />
        <input
          value={this.state.choiceToAdd.answer}
          onChange={this.handleQuestionChange}
          onBlur={this.handleAddChoiceBlur.bind(this, 'answer')} />
        <button
          onClick={this.addChoice}>Add choice</button>
      </div>
    );
  },



  handleAddChoiceBlur(field, event) {

  },

  addChoice() {

    var self = this;

    this.props.addChoice(this.state.choiceToAdd, function(err) {
      if(err) {
        console.error(err);
      } else {
        self.setState({
          choiceToAdd: {
            answer: "",
            isCorrect: false
          }
        });
      }

    })

  },



  handleQuestionChange(event) {
    this.setState({
      question: event.target.value
    })
  },

  handleQuestionBlur() {
    this.props.updateAssessmentItemQuestion(this.state.question)
  }

});

/**
 *
 */
export const AssessmentItemEditorContainer = createContainer(function (props) {

  return {
    assessmentItem: AssessmentItemMongoCollection.findOne({
      _id: props.itemId
    }),
    updateAssessmentItemQuestion(newValue) {
      Meteor.call(
        "tools/assessment-creator/updateAssessmentItemQuestion",
        props.itemId,
        newValue
      )
    }
  };

}, AssessmentItemEditor);

export default AssessmentItemEditor;