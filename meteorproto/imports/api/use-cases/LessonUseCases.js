"use strict";

import { Random } from 'meteor/random';

/**
 * Created by andrew on 6/2/17.
 */
export class LessonUseCases {

  constructor(deps) {
    this._lessonTemplateRepository = deps._lessonTemplateRepository;
  }

  /**
   * Creates a new lesson template
   */
  createLesson({date}, cb) {

    var lesson = {
      id: Random.id(),
      date: date,
      program: []
    };

    this._lessonTemplateRepository.insert(lesson, cb);

  }

  /**
   *
   * @param lessonId
   * @param item
   */
  addProgramItem(lessonId, item) {

    // TODO assert to check item schema

    this._lessonTemplateRepository.update(
      {
        _id: lessonId
      },
      {
        $push: {
          program: item
        }
      });

  }

}