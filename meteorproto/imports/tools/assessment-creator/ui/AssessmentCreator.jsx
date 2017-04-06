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

  componentWillReceiveProps(props) {
    this.setState({
      title: props.assessment ? props.assessment.title : ""
    })
  },

  getInitialState() {
    return {
      title: ""
    }
  },

  render() {

    return (
      <div className="tool-assessment-creator">
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
        {
          this.props.assessments.map(this.renderAssessmentLink)
        }
      </div>
    )
  },

  renderAssessmentLink(assessment) {
    return (
      <div>
        <Link to={this.props.path + '/' + assessment._id}>{assessment.title} <br />(assessment._id)</Link>
      </div>
    );
  },

  renderEditor() {
    return (
      <AssessmentEditorContainer
        assessment={this.props.assessment} />
    )
  },

  updateTitleState(event) {
    this.setState({
      title: event.target.value
    })
  },

  updateTitle() {
    Meteor.call("tools/assessment-creator/updateAssessmentTitle",
      this.props.assessmentId, this.state.title)
  }

});

/**
 *
 */
export const AssessmentCreatorContainer = createContainer(function (props) {

  console.log(props);

  Meteor.subscribe('assessments', {});

  return {
    assessments: AssessmentMongoCollection.find({}).fetch(),
    assessment: AssessmentMongoCollection.findOne({_id: props.assessmentId})
  };

}, AssessmentCreator);