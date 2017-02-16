"use strict";

import MongoLessonRepository from
  '/imports/api/lesson/MongoLessonRepository.js';
import AssessmentTemplateRepository from
  '/imports/api/assessment/AssessmentTemplateRepository';
import  AssessmentItemTemplateRepository from
  '/imports/api/assessment/AssessmentItemTemplateRepository';

import LessonUseCases from
  '/../lib/lesson/LessonUseCases.js';
import AssessmentTemplateUseCases from
  '/../lib/assessment/AssessmentTemplateUseCases.js';

// Wire the required repositories into the use cases.
var lessonUseCases = new LessonUseCases({
  lessonRepository: MongoLessonRepository
});

//var assessmentTemplateUseCases = new AssessmentTemplateUseCases({
//  assessmentTemplateRepository: AssessmentTemplateRepository,
//  assessmentItemTemplateRepository: AssessmentItemTemplateRepository
//});

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

  "lesson/create"({date}) {
    // TODO checks
    lessonUseCases.createLesson({date: date}, logResult);
  },

  "lesson/addNewItemToProgram"(lessonId, assessmentItemId) {
    check(lessonId, String);
    check(assessmentItemId, String);

    lessonUseCases.addAssessmentTemplateToLessonProgram(lessonId,
      assessmentItemId, logResult);
  },

  //"assessment/create"(assessment) {
  //  console.log(assessment);
  //  // TODO checks
  //  assessmentTemplateUseCases.createAssessment(assessment, logResult);
  //},
  //
  //"assessment/addNewItem"(item, assessmentId) {
  //  // TODO checks
  //  assessmentTemplateUseCases.addNewItemToAssessment(item, assessmentId, logResult);
  //}

});