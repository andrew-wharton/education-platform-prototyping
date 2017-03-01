"use strict";

import { Meteor } from 'meteor/meteor';
import AssessmentMongoCollection
  from '/imports/api/assessment/AssessmentMongoCollection';

/**
 * Created by andrew on 23/2/17.
 */

Meteor.publish("assessments", function (selector, options, publisher) {

  // TODO restrict access to lessons which the user has access to
  return AssessmentMongoCollection.find(selector, options);

});