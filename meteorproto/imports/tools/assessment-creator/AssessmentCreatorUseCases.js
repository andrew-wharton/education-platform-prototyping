"use strict";

import vasync from 'vasync';
import VError from 'verror';
import assert from 'assert-plus';

/**
 * Responsible for implementing the application functionality required for the
 * assessment creation and editing.
 *
 */
export class AssessmentCreatorUseCases {

  constructor({assessmentRepository, assessmentItemRepository}) {
    this._assessmentRepository = assessmentRepository;
    this._assessmentItemRepository = assessmentItemRepository;
  }

  /**
   *
   * @param assessment
   * @param {function} callback
   */
  createAssessment(assessment, callback) {
    try {

      assert.object(assessment, 'assessment');
      assert.optionalFunc(callback, 'callback');

      if(assessment.isValid()) {
        this._assessmentRepository.create(assessment, function(err, assessmentId) {
          if(err) {
            callback(new VError(err, "AssessmentCreatorUseCases.createAssessment.create"));
          } else {
            callback(null, assessmentId);
          }
        });
      } else {
        setTimeout(function() {
          callback(new Error("Assessment is not valid"));
        }, 0);
      }
    } catch(err) {
      setTimeout(function() {
        callback(new VError(err, "AssessmentCreatorUseCases.createAssessment"));
      }, 0);
    }
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

  _callbackWithError(callback, error) {

  }

}