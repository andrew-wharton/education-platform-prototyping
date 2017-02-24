"use strict";


/**
 * Lesson domain class/entity
 */
export default class Lesson {

  constructor() {
    this.startAt = new Date();
    this.endedAt = null;
    this.program = [];
  }

}