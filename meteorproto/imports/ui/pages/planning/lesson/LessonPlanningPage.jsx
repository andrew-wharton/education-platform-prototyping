"use strict";

import React, { Component } from 'react';
import { Link } from 'react-router';
import LessonContentItemType
  from '/imports/api/lessonContentItem/LessonContentItemType';
import './LessonPlanningPage.less';

const LESSON_CONTENT_MAPPING = Object.freeze({
  [LessonContentItemType.ASSESSMENT]: "assessment-creator"
});

/**
 *
 */
export class LessonPlanningPage extends Component {

  render() {

    var self = this;

    return (
      <div className="lesson-planning-page">
        <div className="lesson-plan-outline">
          <ul>
            {
              this.props.lessonProgramItems ?
                this.props.lessonProgramItems.map(function(item) {
                  return self.renderLessonProgramItem(self.props.lesson, item)
                }) :
                null
            }
          </ul>
          <div>
            <button onClick={this.props.addNewAssessment}>Add new assessment</button>
          </div>
        </div>
        {
          this.props.children
        }
      </div>
    );
  }

  renderLessonProgramItem(lesson, lessonProgramItem) {

    var path = LESSON_CONTENT_MAPPING[lessonProgramItem.type];

    return (
      <Link to={`/planning/lessons/${lesson._id}/${path}/${lessonProgramItem._id}`}>
        <li>
          <div>{lessonProgramItem.title}</div>
          <div>({lessonProgramItem.type})</div>
        </li>
      </Link>
    )

  }

}