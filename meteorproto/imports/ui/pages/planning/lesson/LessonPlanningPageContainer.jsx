import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import MongoLessonRepository from '/imports/api/lesson/MongoLessonRepository';
import { LessonPlanningPage } from './LessonPlanningPage.jsx';

var lessonRepository = new MongoLessonRepository();

/**
 *
 */
export const LessonPlanningPageContainer = createContainer(function (props) {

  // Open a subscription to the Lesson
  var lessonHandle = Meteor.subscribe('lessons', {id: props.params.lessonId});

  return {
    lessonCursor: lessonRepository.get(props.params.lessonId)
  };

}, LessonPlanningPage);