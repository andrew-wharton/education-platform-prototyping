"use strict";

/**
 * Created by andrew on 6/2/17.
 */
export default class AssessmentItem {

  constructor(itemFields) {
    this.type = null;
    this.question = "";
    this.choices = [];
    this.taskDescription = "";
    this.tags = [];
    this.attributes = {};
    this.ownerId = "";
    this.parentId = "";
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
          taskDescription: this.taskDescription,
          tags: this.tags,
          attributes: this.attributes,
          ownerId: this.ownerId,
          parentId: this.parentId
        }
      )
    );
  }

}