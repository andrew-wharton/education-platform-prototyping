"use strict";

import { Meteor } from 'meteor/meteor';
import AssessmentItemMongoCollection
  from '/imports/api/assessment-item/AssessmentItemMongoCollection';

/**
 * Created by andrew on 23/2/17.
 */
Meteor.publish("assessment_items", function (selector, options = {}) {

  // TODO restrict access to assessment items which the user has access to
  // TODO restrict access to the correct response

  _.extend(options, {
    fields: {
      //"choices.isCorrect": false
    }
  });
  return AssessmentItemMongoCollection.find(selector, options);

});