"use strict";

import Lesson from '/imports/api/lesson/Lesson';
import LessonPlannerUseCases from '/imports/tools/lesson-planner/LessonPlannerUseCases';
import MongoLessonRepository from '/imports/api/lesson/MongoLessonRepository';

var lessonPlannerUseCases = new LessonPlannerUseCases({
  lessonRepository: new MongoLessonRepository()
});

/**
 * Helper function to log results from use cases for testing
 * @param err
 * @param result
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
 */
Meteor.methods({

  "lesson/create"({ startAt }) {
    // TODO checks
    var lesson = new Lesson();
    lesson.startAt = new Date(startAt);
    lessonPlannerUseCases.createLesson(lesson, logResult);
  },

  "tools/lesson-planner/addNewItemToProgram"(lessonId, assessmentItemId) {
    check(lessonId, String);
    check(assessmentItemId, String);

    lessonUseCases.addAssessmentTemplateToLessonProgram(lessonId,
      assessmentItemId, logResult);
  }

});