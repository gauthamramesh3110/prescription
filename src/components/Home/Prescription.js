import React, { Component } from "react";
import MedicineSchedule from "./MedicineSchedule";



export class Prescription extends Component {
  scheduleContent;

  render() {
    if (this.props.currentPrescription != null)
      return (
        <div className="container">
          <div className="row center-align">
            <h4>{this.props.currentPrescription.name}</h4>
            <MedicineSchedule medicines={this.props.currentPrescription.medicines}></MedicineSchedule>
          </div>
        </div>
      );
    else return <div></div>;
  }
}

export default Prescription;
