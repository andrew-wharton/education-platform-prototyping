"use strict";

import Lesson from '/imports/api/lesson/Lesson';
import LessonMongoCollection from './LessonMongoCollection';

/**
 * Responsible for adapting a persistence agnostic interface to the
 * Meteor specific Collection interface
 */
export default class MongoLessonRepository {

  /**
   *
   */
  constructor() {

    /*
      Allow the collection to be injected so we can unit test that the update
      methods are building correct mongo queries from the given Lesson params
     */
    this._mongoCollection = LessonMongoCollection;
  }

  /**
   *
   * @param {string} id
   * @param {function} callback - Optional
   */
  get(id, callback) {

    console.log(id);

    var lessonData = this._mongoCollection.findOne({
      _id: id
    });

    console.log(lessonData);

    if(lessonData) {
      // TODO refactor into to a factory
      var lesson = new Lesson();
      lesson.id = lessonData._id;
      lesson.startAt = lessonData.startAt;
      lesson.endAt = lessonData.endAt;
      lesson.program = lessonData.program;
      return lesson
    } else {
      return null
    }

  }

  /**
   *
   * @param {object} spec
   */
  find(spec) {
    var lessonDataArray = this._mongoCollection.find(spec).fetch();

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
   * @param {Lesson} lesson
   * @param {function} callback
   */
  create(lesson, callback) {

    // TODO check the fields

    var lessonData = {
      startAt: lesson.startAt,
      endAt: lesson.endAt,
      program: lesson.program
    };

    this._mongoCollection.insert(lessonData);

  }

  /**
   * Translates the update into a mongo collection specific query
   *
   * @param {Lesson} lesson
   * @param {function} callback
   */
  update(lesson, callback) {

    var query = {
      _id: lesson.id
    };

    var update = {};

    /*
      For MongoDB, we use an array of AssessmentTemplate _ids as foreign keys
      to the AssessmentTemplate collection.
     */
    if(lesson.program) {
      update["$set"] = {
        program: lesson.program.map(function(assessmentItem) {
          return assessmentItem.id;
        })
      };
    }

    this._mongoCollection.update(query, update, callback);
  }

  /**
   *
   * @param {Lesson} lesson
   * @param {function} callback
   */
  delete(lesson, callback) {

  }

  /**
   * Maps/links/adds a content item to the program of a lesson.
   *
   * For the MongoDB implementation, this is implemented as an embedded
   * array of assessmentItem IDs.
   *
   * @param lessonId
   * @param assessmentId
   * @param {function} callback
   */
  addItemToProgram(lessonId, assessmentId, callback) {

    var query = {
      _id: lessonId
    };

    var update = {
      $push: {
        program: assessmentId
      }
    };

    if(callback) {
      this._mongoCollection.update(
        query,
        update,
        callback
      );
    } else {
      return this._mongoCollection.update(
        query,
        update
      );
    }

  }

}