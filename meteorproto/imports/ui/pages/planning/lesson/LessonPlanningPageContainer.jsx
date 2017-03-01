"use strict";

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { createContainer } from 'meteor/react-meteor-data';

import MongoLessonRepository from '/imports/api/lesson/MongoLessonRepository';
import MongoAssessmentRepository
  from '/imports/api/assessment/MongoAssessmentRepository.js';
import { LessonPlanningPage } from './LessonPlanningPage.jsx';
import LessonContentItemType
  from '/imports/api/lessonContentItem/LessonContentItemType';

// TODO remove the direct collection query
import LessonMongoCollection from '/imports/api/lesson/LessonMongoCollection';
import LessonContentItemMongoCollection
  from '/imports/api/lessonContentItem/LessonContentItemMongoCollection'

var lessonRepository = new MongoLessonRepository();
var assessmentRepository = new MongoAssessmentRepository();

/**
 *
 */
export const LessonPlanningPageContainer = createContainer(function (props) {

  // Open a subscription to the Lesson
  var lessonHandle = Meteor.subscribe('lessons', {_id: props.params.lessonId});
  var lesson = LessonMongoCollection.findOne(props.params.lessonId);

  if(lesson) {

    var lessonProgramItemsHandle = Meteor.subscribe('lessonContentItems', {
      _id: {
        $in: lesson.program.map(function(item) {
          return item.id
        })
      }
    });

    // TODO at the moment we can only add assessments, but the type of lesson
    // content will need to be abstracted so that we can have all sorts of content
    var lessonProgramItems = LessonContentItemMongoCollection.find(
      {
        _id : {
          $in: lesson.program
        }
      }
    ).fetch();
    console.log(lessonProgramItems);

    return {
      lessonReady: lessonHandle.ready(),
      lesson: lesson,
      lessonProgramItemsReady: lessonProgramItemsHandle.ready(),
      lessonProgramItems: lessonProgramItems,
      addAssessment() {

        // TODO change back to a method call
        Meteor.call('tools/lesson-planner/addNewItemToProgram',
          props.params.lessonId,
          {},
          function(err, res) {
          console.log(err, res);
        });
      }
    };

  } else {
    return {
      lessonReady: lessonHandle.ready(),
      lesson: null
    };
  }



}, LessonPlanningPage);