import React from 'react';
import { Meteor } from 'meteor/meteor';
import './LessonPlanningPage.less';

export const LessonPlanningPage = React.createClass({

  render() {
    return (
      <div className="lesson-planning-page">
        <section className="placeholder-content">
          <p>Here would be the root page/view for planning lessons.</p>
          <p>There could be interfaces for adding content to the lesson,
            forking/cloning the lesson etc.</p>
        </section>
      </div>
    );
  }

});