"use strict";
import vasync from 'vasync';

/**
 * Created by andrew on 6/2/17.
 */
export class AssessmentTemplateUseCases {

  constructor({
    assessmentTemplateRepository, _assessmentItemTemplateRepository
  }) {
    this._assessmentTemplateRepository = assessmentTemplateRepository;
    this._assessmentItemTemplateRepository = _assessmentItemTemplateRepository;
  }

  createAssessment(assessment, cb) {

    // TODO asserts to check args

    this._assessmentTemplateRepository.insert(assessment, cb);
  }

  createAssessmentItem({}) {

  }

  addNewItemToAssessment(item, assessmentId, cb) {

    var itemId;

    // Create the item
    vasync.waterfall([
      function createItem(next) {
        this._assessmentItemTemplateRepository.insert(item, next)
      },
      function addItemToAssessment(itemId_, next) {
        itemId = itemId_;
        this._assessmentTemplateRepository.update(
          {
            _id: assessmentId
          },
          {
            $push: {
              "items": itemId
            }
          }
        );
      }
    ], function(err, res) {
      if(err) {
        cb(new VError(err, 'addNewItemToAssessment'));
      } else {
        cb(null, itemId);
      }
    });

  }

}