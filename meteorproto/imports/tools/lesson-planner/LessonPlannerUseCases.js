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
  constructor({lessonRepository, assessmentRepository}) {
    this._lessonRepository = lessonRepository;
    this._assessmentRepository = assessmentRepository;
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
   * @param callback
   */
  addAssessmentToLessonProgram(lessonId, assessment, callback) {

    var self = this;

    // Create the new Assessment
    this._assessmentRepository.create(assessment, function(err, assessmentId) {
      // Then add it to the lesson in the lessonRepository
      console.log(lessonId);
      console.log(assessmentId);
      self._lessonRepository.addItemToProgram(lessonId, assessmentId, callback);
    });


  }

}