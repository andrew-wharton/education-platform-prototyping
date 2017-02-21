"use strict";

import VError from 'verror';
import { AssessmentMongoCollection } from './AssessmentMongoCollection.js';
import { MongoAssessmentFactory } from './MongoAssessmentFactory.js';
import { Random } from 'meteor/random';

/**
 * Created by andrew on 14/2/17.
 */
export class MongoAssessmentRepository {

  /**
   *
   * @param {string} id
   * @param {function} callback
   */
  get(id, callback) {
    try {
      var assessmentData = AssessmentMongoCollection.findOne(id).fetch();
      var assessment = MongoAssessmentFactory.new(assessmentData);
      setTimeout(function() {
        callback(null, assessment);
      }, 0);
    } catch(err) {
      setTimeout(function() {
        callback(new VError(err, 'MongoAssessmentRepository.get'));
      }, 0);
    }
  }

  /**
   *
   * @param {Assessment} assessment
   * @param {function} callback - function of the form function(err, id)
   */
  create(assessment, callback) {
    if(assessment.isValid()) {
      AssessmentMongoCollection.insert({
        title: assessment.title,
        itemIds: assessment.itemIds,
        tags: assessment.tags,
        attributes: assessment.attributes
      }, function(err, _id) {
        if(err) {
          callback(new VError(err, "MongoAssessmentRepository.create"));
        } else {
          callback(null, _id);
        }
      })
    }
  }

  /**
   *
   * @param {Assessment} assessment
   * @param {function} callback
   */
  update(assessment, callback) {

  }

  /**
   *
   * @param {string} id
   * @param {function} callback
   */
  remove(id, callback) {

  }

}