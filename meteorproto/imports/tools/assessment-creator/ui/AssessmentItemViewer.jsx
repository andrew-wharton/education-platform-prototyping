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

RENDERERS[AssessmentItemType.MULTIPLE_CHOICE] = function(assessmentItem) {
  return (
    <div className="multiple-choice">
      <div className="question">
        {
          assessmentItem.question ?
            assessmentItem.question :
            'No question'
        }
      </div>
      <ol>
        {
          assessmentItem.choices.map(renderChoice)
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
    if(this.props.assessmentItem) {
      console.log(RENDERERS)
    }

    return (
      <div className="AssessmentItemViewer">
        {
          this.props.assessmentItem ?
            RENDERERS[this.props.assessmentItem.type](this.props.assessmentItem) :
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