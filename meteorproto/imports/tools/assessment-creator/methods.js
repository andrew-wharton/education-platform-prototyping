"use strict";

import { check } from 'meteor/check';
import Assessment from '/imports/api/assessment/Assessment.js';
import AssessmentMongoCollection
  from '/imports/api/assessment/AssessmentMongoCollection.js';
import AssessmentItemMongoCollection
  from '/imports/api/assessment-item/AssessmentItemMongoCollection.js';
import { AssessmentCreatorUseCases } from './AssessmentCreatorUseCases.js';

// Wire up the use cases with it's repository implementation
const useCases = new AssessmentCreatorUseCases({
  assessmentCollection: AssessmentMongoCollection,
  assessmentItemCollection: AssessmentItemMongoCollection
});

/**
 * Exposes Meteor methods to the client so it can call the use cases
 */
Meteor.methods({

  "tools/assessment-creator/createAssessment"({title}) {

    check(title, String);

    // TODO added itemIds, tags and attributes
    if(Meteor.user()) {
      useCases.createAssessment(
        {
          assessment: {
            title: title ? title : ""
          },
          ownerId: Meteor.userId()
        },
        function(err, assessmentId) {
          if(err) {
            console.error(err);
          } else {
            console.log(assessmentId);
          }
        }
      );
    } else {
      throw new Meteor.Error("401", "Unauthorised")
    }
  },

  "tools/assessment-creator/deepCloneAssessment"(assessmentId) {

    check(assessmentId, String);

    useCases.deepCloneAssessment(
      {
        assessmentId: assessmentId,
        ownerId: Meteor.userId()
      },
      function(err, assessmentId) {
        if(err) {
          console.error(err);
        } else {
          console.log(assessmentId);
        }
      }
    );
  },

  "tools/assessment-creator/updateAssessmentTitle"(assessmentId, newTitle) {

    check(assessmentId, String);
    check(newTitle, String);

    useCases.updateAssessmentTitle(
      assessmentId,
      newTitle,
      function handleUseCaseResult(err) {
        if (err) {
          console.error(err);
        }
      }
    );
  },

  "tools/assessment-creator/addNewItemToAssessment"(assessmentId, item) {

    check(assessmentId, String);
    check(item, Object);

    useCases.addNewItemToAssessment(assessmentId, item, function (err) {
      if (err) {
        console.error(err);
      }
    });
  },

  "tools/assessment-creator/removeAssessmentItem"({assessmentId, assessmentItemId}) {

    check(assessmentId, String);
    check(assessmentItemId, String);

    useCases.removeAssessmentItem(assessmentId, assessmentItemId, function (err) {
      if (err) {
        console.error(err);
      }
    });

  },

  "tools/assessment-creator/addExistingItemToAssessment"(assessmentId, assessmentItemId) {
    //useCases.addNewItemToAssessment()
  },

  /**
   *
   */
    "tools/assessment-creator/updateAssessmentItemQuestion"(assessmentItemId, newQuestion) {

    check(assessmentItemId, String);
    check(newQuestion, String);

    useCases.updateAssessmentItemQuestion(assessmentItemId, newQuestion, function (err) {
      if (err) {
        console.error(err);
      }
    });
  },

  "tools/assessment-creator/addChoiceToAssessmentItem"(assessmentItemId, choice) {

    check(assessmentItemId, String);
    check(choice, Object);
    check(choice.answer, String);
    check(choice.isCorrect, Boolean);

    useCases.addChoiceToAssessmentItem(assessmentItemId, choice, function (err) {
      if (err) {
        console.error(err);
      }
    });

  },

  "tools/assessment-creator/updateAssessmentItemChoiceAnswer"(context, answer) {

    check(context, Object);
    check(context.assessmentItemId, String);
    check(context.choiceIdentifier, String);
    check(answer, String);

    useCases.updateAssessmentItemChoiceAnswer(context, answer, function (err) {
      if (err) {
        console.error(err);
      }
    });

  },

  "tools/assessment-creator/updateAssessmentItemChoiceIsCorrect"(context, isCorrect) {

    check(context, Object);
    check(context.assessmentItemId, String);
    check(context.choiceIdentifier, String);
    check(isCorrect, Boolean);

    useCases.updateAssessmentItemChoiceIsCorrect(context, isCorrect, function (err) {
      if (err) {
        console.error(err);
      }
    });

  },

  "tools/assessment-creator/removeAssessmentItemChoiceAnswer"(context) {
    check(context, Object);
    check(context.assessmentItemId, String);
    check(context.choiceIdentifier, String);

    useCases.removeAssessmentItemChoiceAnswer(context, function (err) {
      if(err) {
        console.error(err);
      }
    });

  }

});