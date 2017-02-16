"use strict";
import vasync from 'vasync';

/**
 * Created by andrew on 6/2/17.
 */
export class AssessmentUseCases {

  constructor({
    assessmentRepository, _assessmentItemRepository
  }) {
    this._assessmentRepository = assessmentRepository;
    this._assessmentItemRepository = _assessmentItemRepository;
  }

  createAssessment(assessment, cb) {

    // TODO asserts to check args

    this._assessmentRepository.insert(assessment, cb);
  }

  createAssessmentItem({}) {

  }

  addNewItemToAssessment(item, assessmentId, cb) {

    var itemId;

    // Create the item
    vasync.waterfall([
      function createItem(next) {
        this._assessmentItemRepository.insert(item, next)
      },
      function addItemToAssessment(itemId_, next) {
        itemId = itemId_;
        this._assessmentRepository.update(
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