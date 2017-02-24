"use strict";

import LessonMongoCollection from './LessonMongoCollection.js';

/**
 * Created by andrew on 14/2/17.
 */
export class MongoLessonRepository {

  /**
   *
   * @param mongoCollection
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

    var lessonData = this._mongoCollection.findOne({
      _id: id
    });

    if(lessonData) {
      // TODO move this to a factory
      var lesson = new Lesson();
      lesson.startAt = lessonData.startAt;
      return lesson
    } else {
      return null
    }

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

}