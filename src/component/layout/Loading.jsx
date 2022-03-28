import React, { Component } from "react";

export class loading extends Component {
  render() {
    return (
      <div className="loading_crl">
        <svg
          className="loading"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx="50"
            cy="50"
            fill="none"
            stroke="#ab7a5f"
            strokeWidth="4"
            r="25"
            strokeDasharray="117.80972450961724 41.269908169872416"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
            ></animateTransform>
          </circle>
        </svg>
      </div>
    );
  }
}

export default loading;
