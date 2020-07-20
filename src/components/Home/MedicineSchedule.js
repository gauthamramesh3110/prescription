import React, { Component } from "react";
import M from "materialize-css";
import EditMedicineModal from "./EditMedicineModal";

export class MedicineSchedule extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  state = {
    selectedIndex: null,
  };

  medicineScheduleStyle = {
    marginBottom: "20px",
  };

  selectIndexAndConfirm = (index, e) => {
    this.setState({
      selectedIndex: index,
    });

    let el = document.getElementById("delete-confirmation-modal");
    let modalInstance = M.Modal.getInstance(el);
    modalInstance.open();
  };

  Schedule = (medicine) => {
    let colSize = 12 / medicine.schedule.length;
    return (
      <div className="row">
        {medicine.schedule.map((isScheduled, index) => {
          let colClass = "center-align col s" + colSize;
          return (
            <div className={colClass} key={index}>
              {isScheduled ? (
                <i className="material-icons teal-text text-darken-2">lens</i>
              ) : (
                <i className="material-icons teal-text text-darken-2">
                  panorama_fish_eye
                </i>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    let { medicines } = this.props;

    return medicines != null ? (
      <div className="container">
        {medicines.map((medicine, index) => {
          return (
            <div className="row" key={index} style={this.medicineScheduleStyle}>
              <div
                className="col s12 waves-effect"
                onClick={this.selectIndexAndConfirm.bind(this, index)}
                href="#delete-confirmation-modal"
              >
                <h6 className="row">{medicine.name}</h6>
                {this.Schedule(medicine)}
              </div>
            </div>
          );
        })}
        <EditMedicineModal
          selectedIndex={this.state.selectedIndex}
          deleteMedicine={this.props.deleteMedicine}
        ></EditMedicineModal>
      </div>
    ) : (
      <div>No Medicines Found</div>
    );
  }
}

export default MedicineSchedule;
