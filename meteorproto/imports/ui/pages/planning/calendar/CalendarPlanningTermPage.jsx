"use strict";

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data'
import LessonRepository from '/imports/api/lesson/MongoLessonRepository'
//import './CalendarPlanningTermPage.less';

var lessonRepository = new LessonRepository();

/**
 *
 */
export class CalendarPlanningTermPage extends Component {

  render() {
    return (
      <div>
        CalendarPlanningTermPage
        <ul>
          {
            this.props.lessons.map(this.renderLessonLink)
          }
        </ul>
      </div>
    );
  }

  renderLessonLink(lesson) {
    return (
      <li key={lesson._id}>{lesson._id}</li>
    );
  }

}

/**
 *
 */
export const CalendarPlanningTermPageContainer = createContainer(function (props) {

  // Open a subscription to all lessons
  var lessonHandle = Meteor.subscribe('lessons', {});
  var lessons = lessonRepository.find({});

  return {
    lessonsReady: lessonHandle.ready(),
    lessons: lessons,
    createLesson() {
      var lessonData = {
        startAt: new Date(2017, 3, 8).toISOString()
      };
      Meteor.call('lesson/create', lessonData);
    }
  }

}, CalendarPlanningTermPage);