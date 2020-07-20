import React, { Component } from "react";

export class AddMedicineModal extends Component {
  state = {
    medicineName: "",
    scheduleDivision: 2,
    schedule: [false, false],
  };

  headingStyle = {
    marginTop: "40px",
  };

  addMedicine = (event) => {
    let medicine = {
      name: this.state.medicineName,
      schedule: this.state.schedule,
    };

    this.props.addMedicine(medicine);
  };

  setScheduleDivision = (event) => {
    let selectedScheduleDivision = parseInt(event.target.value);

    let selectedSchedule = Array(selectedScheduleDivision)
      .fill()
      .map(() => {
        return false;
      });

    this.setState({
      scheduleDivision: selectedScheduleDivision,
      schedule: selectedSchedule,
    });
  };

  setSchedule = (event) => {
    let currenSchedule = this.state.schedule;
    currenSchedule[event.target.id] = event.target.checked;
    this.setState({
      schedule: currenSchedule,
    });
  };

  handleTextInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  scheduleSelector = () => {
    let colSize = 12 / this.state.scheduleDivision;
    return (
      <div className="center-align">
        <p style={this.headingStyle}>Select Schedule</p>
        <div className="row">
          {Array(this.state.scheduleDivision)
            .fill()
            .map((val, index) => {
              let colClass = "center-align col s" + colSize;
              return (
                <label className={colClass} key={index}>
                  <input
                    type="checkbox"
                    id={index}
                    className="filled-in"
                    onChange={this.setSchedule}
                    checked={this.state.schedule[index]}
                  ></input>
                  <span></span>
                </label>
              );
            })}
        </div>
      </div>
    );
  };

  scheduleDivisionSelector = () => {
    return (
      <div className="center-align">
        <p style={this.headingStyle}>Schedule Division</p>
        <div onChange={this.setScheduleDivision} className="row">
          <label className="col s4 center-align">
            <input
              name="schedule-division"
              type="radio"
              value="2"
              className="with-gap"
              defaultChecked
            ></input>
            <span>2</span>
          </label>
          <label className="col s4 center-align">
            <input
              name="schedule-division"
              type="radio"
              value="3"
              className="with-gap"
            ></input>
            <span>3</span>
          </label>
          <label className="col s4 center-align">
            <input
              name="schedule-division"
              type="radio"
              value="4"
              className="with-gap"
            ></input>
            <span>4</span>
          </label>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div id="add-medicine-modal" className="modal">
        <div className="modal-content">
          <div className="input-field">
            <input
              id="medicineName"
              type="text"
              onChange={this.handleTextInputChange}
            ></input>
            <label htmlFor="medicine-name">Medicine Name</label>
          </div>
          {this.scheduleDivisionSelector()}
          {this.scheduleSelector()}
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            onClick={this.addMedicine}
            className="modal-close waves-effect btn"
          >
            Add
          </a>
        </div>
      </div>
    );
  }
}

export default AddMedicineModal;
