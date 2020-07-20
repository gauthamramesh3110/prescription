import React, { Component } from "react";
import M from "materialize-css";

import firebaseFunctions from "../firebase";
import Sidenav from "../components/Home/Sidenav";
import Navbar from "../components/Home/Navbar";
import Prescription from "../components/Home/Prescription";
import AddMedicineModal from "../components/Home/AddMedicineModal";

export class Home extends Component {
  state = {
    currentPrescription: null,
    prescriptions: null,
  };

  setCurrentPrescription = (prescriptionId) => {
    console.log(prescriptionId);
    let selectedPrescription = this.state.prescriptions.filter(
      (prescription) => {
        return prescription.id === prescriptionId;
      }
    );

    console.log(selectedPrescription[0]);
    this.setState({
      currentPrescription: selectedPrescription[0],
    });
  };

  addMedicine = (medicine) => {
    let currentPrescription = this.state.currentPrescription;

    let medicines = currentPrescription.medicines;
    medicines.push(medicine);

    firebaseFunctions
      .modifyMedicines(currentPrescription.id, medicines)
      .then((msg) => {
        console.log(msg);
        currentPrescription.medicines.push(medicine);
      });
  };

  componentDidMount() {
    M.AutoInit();
    firebaseFunctions.onAuthStateChanged(this.props.history).then((docs) => {
      console.log(docs);
      this.setState({
        prescriptions: docs,
        currentPrescription: docs[0],
      });
    });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Sidenav
          prescriptions={this.state.prescriptions}
          setCurrentPrescription={this.setCurrentPrescription}
        ></Sidenav>
        <Prescription
          currentPrescription={this.state.currentPrescription}
        ></Prescription>
        <AddMedicineModal addMedicine={this.addMedicine}></AddMedicineModal>
      </div>
    );
  }
}

export default Home;
