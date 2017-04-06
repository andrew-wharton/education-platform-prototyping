"use strict";

import Random from 'meteor/random';

/**
 * Responsible for implementing the application functionality required for the
 * assessment creation and editing.
 */
export default class LessonPlannerUseCases {

  /**
   *
   *
   * @param lessonCollection
   * @param assessmentCollection
   */
  constructor({lessonCollection, assessmentCollection}) {
    this._lessonCollection = lessonCollection;
    this._assessmentCollection = assessmentCollection;
  }

  /**
   * Creates a new lesson template.
   *
   * @param {Lesson} lesson
   * @param {function} callback
   */
  createLesson(lesson, callback) {

    var lessonTemplate = {
      startAt: new Date(),
      endAt: null,
      program: []
    };

    _.extend(lessonTemplate, lesson);

    this._lessonCollection.insert(lessonTemplate, callback);
  }

  /**
   * Pushes an Assessment to the lesson program
   *
   * @param {string} lessonId
   * @param {string} type
   * @param callback
   */
  addNewItemToProgram(lessonId, {type}, callback) {

    var assessmentId = Random.id();

    // Create the content item
    LessonContentItemMongoCollection.insert({
      _id: assessmentId,
      type: type
    });

    // Add the
    LessonMongoCollection.update(
      {
        _id: lessonId
      },
      {
        $push: {
          program: assessmentId
        }
      }
    );


  }

}