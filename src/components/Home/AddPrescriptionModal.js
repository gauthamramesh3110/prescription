import React, { Component } from "react";
import M from "materialize-css";

export class AddPrescriptionModal extends Component {
  state = {
    newPrescriptionName: "",
  };

  handleTextInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  addNewPrescription = (e) => {
    let el = document.getElementById("add-prescription-modal");
    let modalInstance = M.Modal.getInstance(el);

    if (this.state.newPrescriptionName.length > 0) {
      this.props.addPrescription(this.state.newPrescriptionName);
      modalInstance.close();
    }
  };

  render() {
    return (
      <div className="modal" id="add-prescription-modal">
        <div className="modal-content">
          <div className="input-field">
            <input
              type="text"
              id="newPrescriptionName"
              onChange={this.handleTextInputChange}
            ></input>
            <label htmlFor="newPrescriptionName">Prescription Name</label>
          </div>
        </div>
        <div className="row center-align" style={{ marginBottom: "10px" }}>
          <button
            className="btn btn-flat yellow-text text-darken-4 waves-effect waves-dark modal-close"
            style={{ marginRight: "5px" }}
          >
            <i className="material-icons left">cancel</i>
            <span>Cancel</span>
          </button>
          <button
            className="btn teal darken-2 waves-effect waves-light"
            onClick={this.addNewPrescription}
            style={{ marginLeft: "5px" }}
          >
            <i className="material-icons left">add</i>
            <span>Add</span>
          </button>
        </div>
      </div>
    );
  }
}

export default AddPrescriptionModal;
