"use strict";

import { Random } from 'meteor/random';
import { check } from 'meteor/check';
import Lesson from '/imports/api/lesson/Lesson';
import Assessment from '/imports/api/assessment/Assessment';
import AssessmentMongoCollection
  from '/imports/api/assessment/AssessmentMongoCollection.js';
import LessonPlannerUseCases from './LessonPlannerUseCases';
import LessonContentItemType
  from '/imports/api/lessonContentItem/LessonContentItemType';
import LessonMongoCollection from '/imports/api/lesson/LessonMongoCollection';
import LessonContentItemMongoCollection
  from '/imports/api/lessonContentItem/LessonContentItemMongoCollection';

var lessonPlannerUseCases = new LessonPlannerUseCases({
  lessonCollection: LessonMongoCollection,
  assessmentCollection: AssessmentMongoCollection
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

    check(startAt, String);

    lessonPlannerUseCases.createLesson({
      startAt: new Date(startAt)
    }, logResult);
  },

  "tools/lesson-planner/addNewItemToProgram"(lessonId, type) {

    console.log('addNewItemToProgram');

    lessonPlannerUseCases.addNewItemToProgram(lessonId)

  }

});