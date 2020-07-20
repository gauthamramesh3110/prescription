import React, { Component } from "react";

export class EditMedicineModal extends Component {
  deleteCurrentMedicine = (index, e) => {
    this.props.deleteMedicine(index);
  };

  render() {
    let { selectedIndex } = this.props;
    return (
      <div className="modal" id="delete-confirmation-modal">
        <div className="modal-content">
          <h6>Are you sure you want to delete?</h6>
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
            className="btn red darken-2 waves-effect waves-light modal-close"
            onClick={this.deleteCurrentMedicine.bind(this, selectedIndex)}
            style={{ marginLeft: "5px" }}
          >
            <i className="material-icons left">delete</i>
            <span>delete</span>
          </button>
        </div>
      </div>
    );
  }
}

export default EditMedicineModal;
