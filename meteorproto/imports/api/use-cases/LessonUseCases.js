"use strict";

import { Random } from 'meteor/random';

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

    var lesson = {
      _id: Random.id(),
      date: date,
      program: []
    };

    this._lessonRepository.insert(lesson, cb);

  }

  /**
   *
   * @param lessonId
   * @param item
   */
  addProgramItem(lessonId, item) {

    // TODO assert to check item data

    this._lessonRepository.update(
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