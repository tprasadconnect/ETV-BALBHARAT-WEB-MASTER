import React from 'react';

export function NewMyBb() {
  return (
    <div className="homeMybb">
      <div className="container">
        <h2 className="text-center">MY BB</h2>
        <div className="row">
          <div className="col-6 col-md-3">
            <div className="box yellowcolor">
              <div className="mybbBackImage mybbGames" />
              <div className="name">GAMES</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="box greencolor">
              <div className="mybbBackImage mybbActivities" />
              <div className="name">Activities & Competitions</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="box yellowcolor">
              <div className="mybbBackImage mybbEbooks" />
              <div className="name">Ebooks</div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="box2">
              <div className="content">
                <h3>EVENTS</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry
                </p>
                <a href="/" className="know">
                  Know More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
