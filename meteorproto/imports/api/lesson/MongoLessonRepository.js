"use strict";

//import LessonRepository from '/lib/lesson/LessonRepository.js';
import LessonMongoCollection from './LessonMongoCollection.js';

/**
 * Created by andrew on 14/2/17.
 */
export class MongoLessonRepository {

  /**
   *
   * @param mongoCollection
   */
  constructor(mongoCollection) {

    /*
      Allow the collection to be injected so we can unit test that the update
      methods are building correct mongo queries from the given Lesson params
     */
    this._mongoCollection = mongoCollection || LessonMongoCollection;
  }

  /**
   *
   * @param id
   * @param callback
   */
  get(id, callback) {

  }

  /**
   *
   * @param lesson
   * @param callback
   */
  create(lesson, callback) {

    // TODO check the fields

    this._mongoCollection.insert(lesson);

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
   * @param lesson
   * @param callback
   */
  delete(lesson, callback) {

  }

}