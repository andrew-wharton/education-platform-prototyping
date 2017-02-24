"use strict";


/**
 * Lesson domain class/entity
 */
export default class Lesson {

  constructor() {
    this.id = "";
    this.startAt = new Date();
    this.endAt = null;
    this.program = [];
  }

}