"use strict";

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AssessmentItemMongoCollection
  from '/imports/api/assessment-item/AssessmentItemMongoCollection';
import { AssessmentItemType }
  from '/imports/api/assessment-item/AssessmentItemType.js';
import './AssessmentItemViewer.less';

const RENDERERS = {};

RENDERERS[AssessmentItemType.MULTIPLE_CHOICE] = function(assessmentItem, index) {
  return (
    <div className="multiple-choice">
      <div className="question">
        {
          assessmentItem.question ?
          `${index + 1}. ` + assessmentItem.question :
            `${index + 1}. ` + 'No question'
        }
      </div>
      <ol>
        {
          assessmentItem.choices.length > 0 ?
            assessmentItem.choices.map(renderChoice) :
            <li className="choice">
              (no answers)
            </li>
        }
      </ol>
    </div>
  );

  /**
   *
   */
  function renderChoice(choice) {
    return (
      <li
        key={choice.identifier}
        className="choice">
        {
          choice.isCorrect ?
            <img
              className="is-correct"
              src="/images/glyphicons-153-check.png" /> :
            <img
              className="is-correct"
              src="/images/glyphicons-154-unchecked.png" />
        }
        <span>
          {
            choice.answer
          }
        </span>
      </li>
    )
  }

};

/**
 *
 */
const AssessmentItemViewer = React.createClass({

  render() {
    return (
      <div className={`AssessmentItemViewer ${this.props.isSelected ? 'is-selected': ''}`}>
        {
          this.props.assessmentItem ?
            RENDERERS[this.props.assessmentItem.type](
              this.props.assessmentItem, this.props.index) :
            "Loading..."
        }
      </div>
    );
  }

});

/**
 *
 */
export const AssessmentItemViewerContainer = createContainer(function (props) {

  return {
    assessmentItem: AssessmentItemMongoCollection.findOne({
      _id: props.itemId
    })
  };

}, AssessmentItemViewer);

export default AssessmentItemViewer;