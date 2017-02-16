"use strict";

var LessonRepository = re;

/**
 * Created by andrew on 12/2/17.
 */
function PgLessonRepository(client) {



}

module.exports = {
  createRepository: function createRepository(options) {
    return new PgLessonRepository(options);
  },
  PgLessonRepository: PgLessonRepository
};