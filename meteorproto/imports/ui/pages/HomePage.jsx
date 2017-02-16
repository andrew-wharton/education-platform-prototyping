import React from 'react'

/**
 * Created by andrewwharton on 30/07/15.
 */
export const HomePage = React.createClass({

  componentDidMount: function() {
    document.title = "The Letterpress | Professional Letterpress Printing Services";
  },

  render: function() {
    return (
      <div className={"home"}>
        <div>
          Home
        </div>
      </div>
    );
  }

});