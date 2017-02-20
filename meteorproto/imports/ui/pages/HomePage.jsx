import React from 'react';
import { MainToolBar } from '/imports/ui/components/MainToolBar.jsx';
import './HomePage.less';

/**
 * Created by andrewwharton on 30/07/15.
 */
export const HomePage = React.createClass({

  componentDidMount: function() {
    document.title = "Home";
  },

  render: function() {
    return (
      <div className="home-page">
        <MainToolBar />
        <section className="placeholder-content">
          <p>Here we should have a dashboard for the user which gives them an
            overview of everything, or then an onboarding for new users.</p>
          <p>It should be user/role specific, so students would likely have a
            different dashboard to educators</p>
        </section>
      </div>
    );
  }

});