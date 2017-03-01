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
        <div className="lesson-plan">
          <h2>Lesson Plan</h2>
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
            <button onClick={this.props.addAssessment}>Add Assessment</button>
          </div>
        </div>
        <section className="placeholder-content">
          <p>Here would be the root page/view for planning lessons.</p>
          <p>There could be interfaces for adding content to the lesson,
            forking/cloning the lesson etc.</p>
          <p>How the program items are linked to the lesson plan needs some
            additional thought on how it should be modelled. Each type of
            program item/resource would contain very different data eg. quiz, video,
            reading assignment, discussion, slides supporting teacher's
            lecture.</p>
          <p>The main purpose of this page is to work with the lesson plan/program.</p>
        </section>
        {
          this.props.children
        }
      </div>
    );
  }

  renderLessonProgramItem(lesson, lessonProgramItem) {

    var path = LESSON_CONTENT_MAPPING[lessonProgramItem.type];

    console.log(lesson);

    return (
      <Link to={`/planning/lesson/${lesson._id}/${path}/${lessonProgramItem._id}`}>
        <li>
          {lessonProgramItem._id}
        </li>
      </Link>
    )

  }

}