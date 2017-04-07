"use strict";

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { AssessmentItemType }
  from '/imports/api/assessment-item/AssessmentItemType.js'
import AssessmentItemMongoCollection
  from '/imports/api/assessment-item/AssessmentItemMongoCollection';
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
      //question: this.props.assessmentItem.question
    }
  },

  render() {

    var item = this.props.assessmentItem;

    return (
      <div className="AssessmentItemEditor">
        {
          this.props.assessmentItem ?
            <div>
              {
                item.type === AssessmentItemType.MULTIPLE_CHOICE ?
                  <div className="question">
                    <input
                      value={this.state.question}
                      onChange={this.handleQuestionChange}
                      onBlur={this.handleQuestionBlur} />
                  </div> :
                  null
              }
            </div> :
            "Loading..."
        }
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