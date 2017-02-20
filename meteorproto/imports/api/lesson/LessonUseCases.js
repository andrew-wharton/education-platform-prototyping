"use strict";

import Lesson from './Lesson.js';

/**
 * Created by andrew on 6/2/17.
 */
export class LessonUseCases {

  constructor({lessonRepository}) {
    this._lessonRepository = lessonRepository;
  }

  /**
   * Creates a new lesson template
   */
  createLesson({date}, cb) {

    var lesson = new Lesson();
    lesson.date = date;

    this._lessonRepository.create(lesson, cb);

  }

  /**
   *
   * @param lessonId
   * @param assessmentTemplate
   */
  addAssessmentTemplateToLessonProgram(lessonId, assessment) {

    //lesson.program.push(assessmentTemplate);


    //this._lessonRepository.update(lesson);
    this._lessonRepository.addItemToProgram(lessonId, item)

  }

}