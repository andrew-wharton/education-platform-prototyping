"use strict";

import React, { Component } from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { createContainer } from 'meteor/react-meteor-data';
import LessonContentItemType
  from '/imports/api/lessonContentItem/LessonContentItemType';
import AssessmentMongoCollection
  from '/imports/api/assessment/AssessmentMongoCollection.js';
import LessonMongoCollection from '/imports/api/lesson/LessonMongoCollection';
import LessonContentItemMongoCollection
  from '/imports/api/lessonContentItem/LessonContentItemMongoCollection'
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
      <div className="LessonPlanningPage">
        <div className="lesson-plan-outline">
          <div className="lesson-item-listing">
            {
              this.props.lessonProgramItems ?
                this.props.lessonProgramItems.map(function(item) {
                  return self.renderLessonProgramItem(self.props.lesson, item)
                }) :
                null
            }
          </div>
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

/**
 *
 */
export const LessonPlanningPageContainer = createContainer(function (props) {

  // Open a subscription to the Lesson
  var lessonHandle = Meteor.subscribe('lessons', {_id: props.params.lessonId});
  var lesson = LessonMongoCollection.findOne(props.params.lessonId);

  if(lesson) {

    var lessonProgramItemsHandle = Meteor.subscribe('lessonContentItems', {
      _id: {
        $in: lesson.program.map(function(item) {
          return item.id
        })
      }
    });

    // TODO at the moment we can only add assessments, but the type of lesson
    // content will need to be abstracted so that we can have all sorts of content
    var lessonProgramItems = LessonContentItemMongoCollection.find(
      {
        _id : {
          $in: lesson.program
        }
      }
    ).fetch();

    return {
      lessonReady: lessonHandle.ready(),
      lesson: lesson,
      lessonProgramItemsReady: lessonProgramItemsHandle.ready(),
      lessonProgramItems: lessonProgramItems,
      addNewAssessment() {

        // TODO change back to a method call
        Meteor.call('tools/lesson-planner/addNewItemToProgram',
          props.params.lessonId,
          {},
          function(err, res) {
            console.log(err, res);
          });
      }
    };

  } else {
    return {
      lessonReady: lessonHandle.ready(),
      lesson: null
    };
  }



}, LessonPlanningPage);