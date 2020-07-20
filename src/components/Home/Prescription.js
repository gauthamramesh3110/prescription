import React, { Component } from "react";
import MedicineSchedule from "./MedicineSchedule";

export class Prescription extends Component {
  deletePrescription = (e) => {
    this.props.deletePrescription();
  };

  render() {
    if (this.props.currentPrescription != null)
      return (
        <div className="container">
          <div className="row center-align">
            <h4>{this.props.currentPrescription.name}</h4>
            <h6>Tap on a medicine to delete.</h6>
          </div>
          <div className="row">
            <MedicineSchedule
              medicines={this.props.currentPrescription.medicines}
              deleteMedicine={this.props.deleteMedicine}
            ></MedicineSchedule>
          </div>
          <div className="row center-align">
            <button
              className="btn red darken-2 waves-effect waves-light"
              onClick={this.deletePrescription}
            >
              Delete Prescription
              <i className="material-icons left">delete</i>
            </button>
          </div>
        </div>
      );
    else return <div></div>;
  }
}

export default Prescription;
