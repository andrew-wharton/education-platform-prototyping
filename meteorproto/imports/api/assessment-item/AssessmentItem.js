"use strict";

/**
 * Created by andrew on 6/2/17.
 */
export default class AssessmentItem {

  constructor(itemFilelds) {
    this.type = null;
    this.question = "";
    this.choices = [];
    this.correctChoices = [];
    this.taskDescription = "";
    this.tags = [];
    this.attributes = {};
    this.ownerId = "";
  }

  /**
   *
   * @returns {{}}
   */
  toObject() {
    // Clone all the fields
    return JSON.parse(
      JSON.stringify(
        {
          type: this.type,
          question: this.question,
          choices: this.choices,
          correctChoices: this.correctChoices,
          taskDescription: this.taskDescription,
          tags: this.tags,
          attributes: this.attributes
        }
      )
    );
  }

}