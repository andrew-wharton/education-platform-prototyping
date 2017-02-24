"use strict";

import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data'
import LessonRepository from '/imports/api/lesson/MongoLessonRepository'
import './CalendarPlanningTermPage.less';

var lessonRepository = new LessonRepository();

/**
 *
 */
export class CalendarPlanningTermPage extends Component {

  render() {
    return (
      <div className="calendar-planning-term-page">
        <section className="placeholder-content">
          <p>My initial UI concept idea for this page is an infinite scrolling
            calendar view with one week per row, similar to the 'month' view in
            macOS's Calendar, or the 'multiweek' view in the calendar in
            Thunderbird.</p>
          <p>Each day could perhaps give a summary of the days lessons etc and
            link to a calendar day view.</p>
        </section>
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
      <li key={lesson.id}>
        <Link to={`/planning/lessons/${lesson.id}`}>{lesson.id}</Link>
      </li>
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