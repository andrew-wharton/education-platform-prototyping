"use strict";

import VError from 'verror';
import AssessmentMongoCollection from './AssessmentMongoCollection';
import { MongoAssessmentFactory } from './MongoAssessmentFactory';
import { Random } from 'meteor/random';

/**
 * Created by andrew on 14/2/17.
 */
export default class MongoAssessmentRepository {

  constructor() {
    this._mongoCollection = AssessmentMongoCollection;
  }

  /**
   *
   * @param {string} id
   * @param {function} callback
   */
  get(id, callback) {
    try {
      var assessmentData = this._mongoCollection.findOne(id).fetch();
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
   * @param {object} spec
   */
  find(spec) {

    var query = {};

    if(spec._id instanceof Array) {
      query._id = {
        $in: spec._id
      }
    }

    var lessonDataArray = this._mongoCollection.find(query).fetch();

    return lessonDataArray.map(function(lessonData) {
      // TODO refactor into to a factory
      var lesson = new Lesson();
      lesson.id = lessonData._id;
      lesson.startAt = lessonData.startAt;
      lesson.endAt = lessonData.endAt;
      lesson.program = lessonData.program;
      return lesson;
    })
  }

  /**
   *
   * @param {Assessment} assessment
   * @param {function} callback - function of the form function(err, id)
   */
  create(assessment, callback) {
    if(assessment.isValid()) {
      this._mongoCollection.insert({
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
      });
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