"use strict";

import Assessment from './Assessment';

/**
 * Created by andrew on 21/2/17.
 */
export class MongoAssessmentFactory {

  static new(mongoData) {
    var assessment = new Assessment();
    assessment.id = mongoData._id;
    assessment.title = mongoData.title;
    assessment.itemIds = mongoData.itemIds;
    assessment.tags = mongoData.tags;
    assessment.attributes = mongoData.attributes;
    return assessment;
  }
}