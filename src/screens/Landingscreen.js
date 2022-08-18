import React from "react";
import { Link } from "react-router-dom";

function Landingscreen() {
  return (
    <div className="row landing">
      <div className="col-md-9 col-sm-12 col-xs-12 text-center" style={{borderRight: "5px solid white"}}>
        <h2 className="landingHead">Horizon Hotels</h2>
        <h1 className="text-wrap landingQuote">
          “It has been, and continues to be, our responsibility to fill the
          earth with the light and warmth of hospitality.”
        </h1>
        <Link to="/home">
          <button class="btn btn-md btn-outline-light landingBtn"> Get Started </button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
