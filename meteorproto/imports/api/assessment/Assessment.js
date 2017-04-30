"use strict";

/**
 * Created by andrew on 6/2/17.
 */
export default class Assessment {

  constructor() {
    this.id = null;
    this.title = "";
    this.itemIds = [];
    this.tags = [];
    this.attributes = {};
    this.ownerId = "";
  }

  isValid() {
    // TODO check the contents of the arrays and objects
    return typeof this.title === 'string' &&
        this.itemIds instanceof Array &&
        this.tags instanceof Array &&
        this.attributes instanceof Object
  }

}