"use strict";

import { Assessment } from '/imports/api/assessment/Assessment.js';
import { MongoAssessmentRepository }
  from '/imports/api/assessment/MongoAssessmentRepository.js';
import { MongoAssessmentItemRepository }
  from '/imports/api/assessment-item/MongoAssessmentItemRepository.js';
import { AssessmentCreatorUseCases } from './AssessmentCreatorUseCases.js';

// Wire up the use cases with it's repository implementation
const useCases = new AssessmentCreatorUseCases({
  assessmentRepository: new MongoAssessmentRepository(),
  assessmentItemRepository: new MongoAssessmentItemRepository()
});

/**
 * Exposes Meteor methods to the client so it can call the use cases
 */
Meteor.methods({

  "tools/assessment-creator/createAssessment"(opts) {

    var assessment = new Assessment();

    if(opts && opts.title) {
      assessment.title = opts.title;
    }

    // TODO added items, tags and attributes


    useCases.createAssessment(assessment, function(err, assessmentId) {
      if(err) {
        console.error(err);
      } else {
        console.log(assessmentId);
      }
    });
  }

});