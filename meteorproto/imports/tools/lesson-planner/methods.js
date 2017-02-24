"use strict";

import {LessonUseCases} from '/imports/api/lesson/LessonUseCases.js';

var lessonUseCases = new LessonUseCases();

/**
 * Helper function to log results from use cases for testing
 * @param err
 */
function logResult(err, result) {
  if(err) {
    console.error(err);
  } else {
    console.log(result);
  }
}

/**
 * @fileOverview Here we create Meteor methods which allow us to call use cases
 * from the client-side application. We use methods as they expose a much
 * smaller surface area to have to secure than having the Collection API exposed
 * to the client and having to secure that.
 *
 */
Meteor.methods({

  "lesson/create"({ startAtDateString }) {
    check(startAtDateString, String);

    var lesson = new Lesson();
    lesson.startAt = new Date.parse(startAtDateString);
    lessonUseCases.createLesson(lesson, logResult);
  },

  "tools/lesson-planner/addNewItemToProgram"(lessonId, assessmentItemId) {
    check(lessonId, String);
    check(assessmentItemId, String);

    lessonUseCases.addAssessmentTemplateToLessonProgram(lessonId,
      assessmentItemId, logResult);
  }

});