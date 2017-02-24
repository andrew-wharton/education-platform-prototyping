"use strict";

/**
 * Created by andrew on 6/2/17.
 */
export default class LessonPlannerUseCases {

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