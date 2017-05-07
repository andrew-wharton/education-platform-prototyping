import React from 'react';
import { Link } from 'react-router';
import { MainToolBar } from '/imports/ui/components/MainToolBar.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import './HomePage.less';

/**
 * Created by andrewwharton on 30/07/15.
 */
export const HomePage = React.createClass({

  componentDidMount: function() {
    document.title = "Home";
  },

  render: function() {
    //<MainToolBar />
    return (
      <div className="home-page">
        <section className="placeholder-content">
          <Link to="/tools/assessment-creator">
            <RaisedButton label="Assessment Creator" />
          </Link>
        </section>
      </div>
    );
  }

});