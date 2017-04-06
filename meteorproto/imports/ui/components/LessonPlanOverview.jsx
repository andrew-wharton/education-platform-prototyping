import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
//import './LessonPlanOverview.less';

export default class LessonPlanOverview extends Component {

  render() {
    return (
      <div>
        <h2>Lesson Plan Overview</h2>
        <section className="placeholder-content">
          <p>Here would be the root page/view for planning lessons.</p>
          <p>There could be interfaces for adding content to the lesson,
            forking/cloning the lesson etc.</p>
          <p>How the program items are linked to the lesson plan needs some
            additional thought on how it should be modelled. Each type of
            program item/resource would contain very different data eg. quiz, video,
            reading assignment, discussion, slides supporting teacher's
            lecture.</p>
          <p>The main purpose of this page is to work with the lesson plan/program.</p>
        </section>
      </div>
    );
  }

}