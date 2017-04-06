"use strict";

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
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

  getInitialState() {
    return {
      title: this.props.assessment.title,
      selectItemId: this.props.assessment.itemIds.length > 0 ?
        this.props.assessment.itemIds : null
    }
  },

  render() {
    return (
      <div className="AssessmentEditor">
        <div className="outline">
          <div className="assessment-fields">
            <label>Title:</label>
            <input
              type="text"
              value={this.state.title}
              onChange={this.updateTitleState}
              onBlur={this.updateTitle} />
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
          <div className="assessment-items-tools">
            <AssessmentItemSearch />
            <ul>
              <li>
                <button
                  onClick={this.addItem.bind(this, AssessmentItemType.MULTIPLE_CHOICE)}>
                  Add Multi Choice Question
                </button>
              </li>
              <li>
                <button
                  onClick={this.addItem.bind(this, AssessmentItemType.WRITTEN_RESPONSE)}>
                  Add Written Response Question
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="details">
          <AssessmentItemEditorContainer
            itemId={this.state.selectedItemId} />
        </div>
      </div>
    );
  },

  renderAssessmentItem(itemId) {
    return (
      <div
        className="assessment-item-viewer-wrapper"
        onClick={this.selectItemId.bind(this, itemId)} >
        <AssessmentItemViewerContainer
          itemId={itemId}
          key={itemId} />
      </div>
    );
  },

  selectItemId(itemId) {
    this.setState({
      selectItemId: itemId
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

  return {
    assessmentItemsReady: assessmentItemsHandle.ready()
  };

}, AssessmentEditor);