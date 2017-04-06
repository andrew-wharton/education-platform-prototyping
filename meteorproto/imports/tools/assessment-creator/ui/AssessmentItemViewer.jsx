"use strict";

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AssessmentItemMongoCollection
  from '/imports/api/assessment-item/AssessmentItemMongoCollection';
import './AssessmentItemViewer.less';

/**
 *
 */
const AssessmentItemViewer = React.createClass({

  render() {
    return (
      <div className="AssessmentItemViewer">
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
export const AssessmentItemViewerContainer = createContainer(function (props) {

  return {
    assessmentItem: AssessmentItemMongoCollection.findOne({
      _id: props.itemId
    })
  };

}, AssessmentItemViewer);

export default AssessmentItemViewer;