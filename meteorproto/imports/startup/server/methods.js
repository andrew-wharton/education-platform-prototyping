"use strict";

/**
 * Created by andrew on 7/2/17.
 */
import { LessonRepository,
  AssessmentTemplateRepository,
  AssessmentItemTemplateRepository
} from '/imports/api/interface-adapters/repositories';
import {
  LessonUseCases,
  AssessmentTemplateUseCases
} from '/imports/api/use-cases';

var lessonUseCases = new LessonUseCases({
  lessonRepository: LessonRepository
});
var assessmentTemplateUseCases = new AssessmentTemplateUseCases({
  assessmentTemplateRepository: AssessmentTemplateRepository,
  assessmentItemTemplateRepository: AssessmentItemTemplateRepository
});

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

Meteor.methods({

  "lesson/create"({date}) {
    // TODO checks
    lessonUseCases.createLesson({date: date}, logResult);
  },

  "lesson/addNewItemToProgram"(lessonId, item) {
    // TODO checks
    lessonUseCases.addProgramItem(lessonId, item, logResult);
  },

  "assessment/create"(assessment) {
    console.log(assessment);
    // TODO checks
    assessmentTemplateUseCases.createAssessment(assessment, logResult);
  },

  "assessment/addNewItem"(item, assessmentId) {
    // TODO checks
    assessmentTemplateUseCases.addNewItemToAssessment(item, assessmentId, logResult);
  }

});