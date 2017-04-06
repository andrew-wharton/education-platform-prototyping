"use strict";

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { AssessmentItemType }
  from '/imports/api/assessment-item/AssessmentItemType.js';
import './ToolBox.less';

/**
 *
 */
export const ToolBox = React.createClass({

  render() {
    return (
      <div>
        Tool Box
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
    );
  },

  addItem(type) {
    Meteor.call(
      "tools/assessment-creator/addNewItemToAssessment",
      {
        type: type
      }
    );
  }

});