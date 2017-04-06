"use strict";

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AssessmentItemMongoCollection
  from '/imports/api/assessment-item/AssessmentItemMongoCollection';
import './AssessmentItemEditor.less';

/**
 *
 */
const AssessmentItemEditor = React.createClass({

  render() {
    return (
      <div className="AssessmentItemEditor">
        {
          this.props.assessmentItem ?
            JSON.stringify(this.props.assessmentItem) :
            "Loading..."
        }
      </div>
    );
  }

});

/**
 *
 */
export const AssessmentItemEditorContainer = createContainer(function (props) {

  return {
    assessmentItem: AssessmentItemMongoCollection.findOne({
      _id: props.itemId
    })
  };

}, AssessmentItemEditor);

export default AssessmentItemEditor;