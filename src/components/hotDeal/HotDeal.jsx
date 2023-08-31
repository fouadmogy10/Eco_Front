import React from "react";
import { Button } from "react-bootstrap";

function HotDeal() {
  return (
    <>
      <div id="hot-deal" className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="hot-deal">
                <h2 className="text-uppercase">hot deal this week</h2>
                <p>New Collection Up to 50% OFF</p>
                <Button variant="transparent" className="btn-def">
                  Read more...
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotDeal;
