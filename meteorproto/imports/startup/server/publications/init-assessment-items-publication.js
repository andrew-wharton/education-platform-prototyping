"use strict";

import { Meteor } from 'meteor/meteor';
import AssessmentItemMongoCollection
  from '/imports/api/assessment-item/AssessmentItemMongoCollection';

/**
 * Created by andrew on 23/2/17.
 */
Meteor.publish("assessment_items", function (selector, options, publisher) {

  // TODO restrict access to assessments which the user has access to
  return AssessmentItemMongoCollection.find(selector, options);

});