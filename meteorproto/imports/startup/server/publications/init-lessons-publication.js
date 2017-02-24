"use strict";

import { Meteor } from 'meteor/meteor';
import LessonsMongoCollection
  from '/imports/api/lesson/LessonMongoCollection';

/**
 * Created by andrew on 23/2/17.
 */

Meteor.publish("lessons", function (selector, options, publisher) {

  // TODO restrict access to lessons which the user has access to
  return LessonsMongoCollection.find(selector, options);

});