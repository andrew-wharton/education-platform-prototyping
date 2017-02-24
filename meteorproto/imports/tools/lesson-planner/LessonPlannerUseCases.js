"use strict";

/**
 * Responsible for implementing the application functionality required for the
 * assessment creation and editing.
 */
export default class LessonPlannerUseCases {

  /**
   *
   *
   * @param lessonRepository - An implementation of the LessonRepository interface
   */
  constructor({lessonRepository}) {
    this._lessonRepository = lessonRepository;
  }

  /**
   * Creates a new lesson template.
   *
   * @param {Lesson} lesson
   * @param {function} callback
   */
  createLesson(lesson, callback) {
    this._lessonRepository.create(lesson, callback);
  }

  /**
   * Pushes an Assessment to the lesson program
   *
   * @param {string} lessonId
   * @param {Assessment} assessment
   */
  addAssessmentToLessonProgram(lessonId, assessment) {
    this._lessonRepository.addItemToProgram(lessonId, item)
  }

}