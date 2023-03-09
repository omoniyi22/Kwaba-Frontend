import React, { Component } from "react";
import { connect } from "react-redux";
import Option from "./Option";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export class Rent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postion: 1,
      postionTitle: "Payment Option",
    };
    this.changeSecond = this.changeSecond.bind(this);
    this.changeThird = this.changeThird.bind(this);
  }
  changeSecond() {
    this.setState({ postion: 2, postionTitle: "Payment " });
  }
  changeThird() {
    this.setState({ postion: 3, postionTitle: "Application Completed" });
  }
  render() {
   
    return (
      <div className=" rent">
        <div className="rent_stages  flex">
          <div className="rent_title">{this.state.postionTitle}</div>
          <div className="rent_ratio  heart flex ml-auto">
            <div className="ratio_num">{this.state.postion} of 3</div>
            <div className="ratio_circle  p-1 ml-auto">
              <div style={{ width: 38, height: 38 }}>
                <CircularProgressbar
                  value={this.state.postion / 3}
                  maxValue={1}
                  strokeWidth={24}
                  styles={buildStyles({
                    rotation: 0.95,

                    textSize: "0px",

                    pathTransitionDuration: 1,

                    pathColor: `#6cd36cd0`,
                    trailColor: "#d6d6d6",
                    backgroundColor: "green",
                  })}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="rent_content">
          <Option
            changeSecond={this.changeSecond}
            changeThird={this.changeThird}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Rent);
