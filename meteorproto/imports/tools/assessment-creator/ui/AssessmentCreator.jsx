"use strict";

import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AssessmentMongoCollection
  from '/imports/api/assessment/AssessmentMongoCollection.js';
import { AssessmentEditorContainer } from './AssessmentEditor.jsx';
import './AssessmentCreator.less';

/**
 *
 */
export const AssessmentCreator = React.createClass({

  propTypes: {
    assessment: React.PropTypes.object,
    lessonId: React.PropTypes.string
  },

  render() {

    return (
      <div className="AssessmentCreator">
        {
          !this.props.assessment ?
            this.renderListing() :
            this.renderEditor()
        }
      </div>
    );
  },

  renderListing() {

    return (
      <div>
        <h2>Assessments</h2>
        <div className="create-assessment">
          <button onClick={this.createNewAssessment}>New Assessment</button>
        </div>
        {
          this.props.assessments.map(this.renderAssessmentLink)
        }
      </div>
    )
  },

  renderAssessmentLink(assessment) {
    return (
      <div className="assessment-link">
        <Link to={this.props.path + '/' + assessment._id}>
          {
            assessment.title && assessment.title.length > 0 ?
              assessment.title :
              <span className="no-title">(No title)</span>
          }
        </Link>
        <button onClick={this.createNewVersion.bind(this, assessment._id)}>
          Create New Version
        </button>
      </div>
    );
  },

  renderEditor() {
    return (
      <AssessmentEditorContainer
        assessment={this.props.assessment} />
    )
  },

  createNewAssessment(event) {
    Meteor.call("tools/assessment-creator/createAssessment", {
      title: '(New Assessment)'
    })
  },

  createNewVersion(assessmentId, event) {
    Meteor.call("tools/assessment-creator/deepCloneAssessment", assessmentId)
  }

});

/**
 *
 */
export const AssessmentCreatorContainer = createContainer(function (props) {

  Meteor.subscribe('assessments', {});

  return {
    assessments: AssessmentMongoCollection.find({}).fetch(),
    assessment: AssessmentMongoCollection.findOne({_id: props.assessmentId})
  };

}, AssessmentCreator);