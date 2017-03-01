"use strict";


import { Random } from 'meteor/random'
import Lesson from '/imports/api/lesson/Lesson';
import LessonPlannerUseCases from '/imports/tools/lesson-planner/LessonPlannerUseCases';
import MongoLessonRepository from '/imports/api/lesson/MongoLessonRepository';
import Assessment from '/imports/api/assessment/Assessment';
import MongoAssessmentRepository from '/imports/api/assessment/MongoAssessmentRepository';
import LessonContentItemType
  from '/imports/api/lessonContentItem/LessonContentItemType';
import LessonMongoCollection from '/imports/api/lesson/LessonMongoCollection';
import LessonContentItemMongoCollection
  from '/imports/api/lessonContentItem/LessonContentItemMongoCollection'

var lessonPlannerUseCases = new LessonPlannerUseCases({
  lessonRepository: new MongoLessonRepository(),
  assessmentRepository: new MongoAssessmentRepository()
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

  "tools/lesson-planner/addNewItemToProgram"(lessonId) {

    console.log('addNewItemToProgram');

    var assessmentId = Random.id();

    // TODO move this to a use case
    LessonContentItemMongoCollection.insert({
      _id: assessmentId,
      type: LessonContentItemType.ASSESSMENT
    });

    LessonMongoCollection.update(
      {
      _id: lessonId
      },
      {
        $push: {
          program: assessmentId
        }
      }
    );

    //check(lessonId, String);
    //check(assessment, Object);


    //var assessment = new Assessment();
    //
    //lessonPlannerUseCases.addAssessmentToLessonProgram(
    //  lessonId,
    //  assessment,
    //  logResult
    //);
  }

});