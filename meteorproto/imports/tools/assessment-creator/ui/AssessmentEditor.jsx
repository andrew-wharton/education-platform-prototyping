"use strict";

import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { AssessmentItemType }
  from '/imports/api/assessment-item/AssessmentItemType.js';
import { AssessmentItemViewerContainer } from './AssessmentItemViewer.jsx';
import { AssessmentItemSearch } from './AssessmentItemSearch.jsx';
import { AssessmentItemEditorContainer } from './AssessmentItemEditor.jsx';
import './AssessmentEditor.less';

/**
 * Editor for a particular Assessment
 */
const AssessmentEditor = React.createClass({

  componentWillReceiveProps(props) {
    this.setState({
      title: props.assessment ? props.assessment.title : ""
    })
  },

  getInitialState() {
    return {
      title: this.props.assessment.title,
      selectItemId: this.props.assessment.itemIds.length > 0 ?
        this.props.assessment.itemIds : null
    }
  },

  render() {

    //<AssessmentItemSearch />

    return (
      <div className="AssessmentEditor">
        <div>
          <Link to={this.props.rootPath} >Back to all assessments</Link>
        </div>
        <div className="editor-views">
          <div className="outline">
            <div className="assessment-fields">
              {
                this.props.userIsOwner ?
                  <TextField
                    floatingLabelText="Assessment Title"
                    value={this.state.title}
                    onChange={this.updateTitleState}
                    onBlur={this.updateTitle}
                    fullWidth={true}
                    multiLine={true} /> :
                  <h2>
                    {
                      this.state.title
                    }
                  </h2>
              }
            </div>
            <div className="assessment-items">
              {
                this.props.assessment.itemIds.map(this.renderAssessmentItem)
              }
              {
                !this.props.assessmentItemsReady ?
                  <div>Loading...</div> :
                  null
              }
            </div>
            {
              this.props.userIsOwner ?
                <div className="assessment-items-tools">
                  <ul>
                    <li>
                      <button
                        onClick={this.addItem.bind(this,
                      AssessmentItemType.MULTIPLE_CHOICE)}>
                        Add Multi Choice Question
                      </button>
                    </li>
                  </ul>
                </div> :
                null
            }
          </div>
          <div className="details">
            {
              this.state.selectedItemId ?
                <AssessmentItemEditorContainer
                  assessmentItemsReady={this.props.assessmentItemsReady}
                  assessmentItemId={this.state.selectedItemId} /> :
                null
            }
          </div>
        </div>

      </div>
    );
  },

  renderAssessmentItem(assessmentItemId, index) {
    if(this.props.user && this.props.assessment.ownerId === this.props.user._id) {
      return (
        <div
          className={`assessment-item editable ${
            this.state.selectedItemId === assessmentItemId ?
            'selected': ''}`}
          onClick={this.selectAssessmentItemId.bind(this, assessmentItemId)} >
          <AssessmentItemViewerContainer
            index={index}
            itemId={assessmentItemId}
            key={assessmentItemId} />
          <div className="remove">
            <IconButton
              iconClassName="material-icons"
              onClick={this.removeAssessmentItem.bind(this, assessmentItemId)}>
              delete
            </IconButton>
          </div>
        </div>
      );
    } else {
      return (
        <AssessmentItemViewerContainer
          index={index}
          itemId={assessmentItemId}
          key={assessmentItemId} />
      );
    }
  },

  removeAssessmentItem(assessmentItemId) {
    Meteor.call(
      "tools/assessment-creator/removeAssessmentItem",
      {
        assessmentId: this.props.assessment._id,
        assessmentItemId: assessmentItemId
      },
      function(err) {
        if(err) {
          console.error(err);
        }
      }
    )
  },

  updateTitleState(event) {
    this.setState({
      title: event.target.value
    })
  },

  updateTitle() {
    Meteor.call(
      "tools/assessment-creator/updateAssessmentTitle",
      this.props.assessment._id,
      this.state.title
    )
  },

  selectAssessmentItemId(assessmentItemId) {
    this.setState({
      selectedItemId: assessmentItemId
    })
  },

  addItem(type) {
    Meteor.call(
      "tools/assessment-creator/addNewItemToAssessment",
      this.props.assessment._id,
      {
        type: type
      }
    );
  }

});

/**
 *
 */
export const AssessmentEditorContainer = createContainer(function (props) {

  // Open a single subscription to the assessment items for the assessment
  var assessmentItemsHandle = Meteor.subscribe('assessment_items', {
    _id: {
      $in: props.assessment.itemIds
    }
  });

  var user = Meteor.user();

  return {
    assessmentItemsReady: assessmentItemsHandle.ready(),
    user: user,
    userIsOwner: user ? user._id === props.assessment.ownerId : false
  };

}, AssessmentEditor);