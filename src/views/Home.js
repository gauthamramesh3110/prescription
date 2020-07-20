import React, { Component } from "react";
import M from "materialize-css";

import firebaseFunctions from "../firebase";
import Sidenav from "../components/Home/Sidenav";
import Navbar from "../components/Home/Navbar";
import Prescription from "../components/Home/Prescription";
import AddMedicineModal from "../components/Home/AddMedicineModal";
import AddPrescriptionModal from "../components/Home/AddPrescriptionModal";

export class Home extends Component {
  state = {
    currentPrescription: null,
    prescriptions: null,
    userDetails: null,
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
    let currentPrescriptionId = currentPrescription.id;

    let medicines = currentPrescription.medicines;
    medicines.push(medicine);

    firebaseFunctions
      .modifyMedicines(currentPrescriptionId, medicines)
      .then((msg) => {
        console.log(msg);
        let newPrescriptions = this.state.prescriptions;

        newPrescriptions.forEach((prescription) => {
          if (prescription.id === currentPrescriptionId) {
            prescription.medicines = medicines;
          }
        });

        this.setState({
          prescriptions: newPrescriptions,
        });
      });
  };

  deletePrescription = () => {
    let prescriptionId = this.state.currentPrescription.id;
    firebaseFunctions.deletePrescription(prescriptionId).then((msg) => {
      console.log(msg);
      let newPrescriptions = this.state.prescriptions.filter((prescription) => {
        return prescription.id !== prescriptionId;
      });
      this.setState({
        prescriptions: newPrescriptions,
        currentPrescription: newPrescriptions[0],
      });
    });
  };

  addPrescription = (prescriptionName) => {
    firebaseFunctions
      .addPrescription(prescriptionName)
      .then((newPrescription) => {
        let currentPrescriptions = this.state.prescriptions;
        currentPrescriptions.push(newPrescription);
        currentPrescriptions.sort(function (a, b) {
          var x = a.name.toLowerCase();
          var y = b.name.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        this.setState({
          prescriptions: currentPrescriptions,
          currentPrescription: newPrescription,
        });
      });
  };

  deleteMedicine = (medicineIndex) => {
    let currentPrescription = this.state.currentPrescription;
    let currentPrescriptionId = currentPrescription.id;

    let medicines = currentPrescription.medicines;
    medicines = medicines.filter((medicine, index) => {
      return index !== medicineIndex;
    });

    firebaseFunctions
      .modifyMedicines(currentPrescriptionId, medicines)
      .then((msg) => {
        console.log(msg);
        let newPrescriptions = this.state.prescriptions;

        newPrescriptions.forEach((prescription) => {
          if (prescription.id === currentPrescriptionId) {
            prescription.medicines = medicines;
          }
        });

        this.setState({
          prescriptions: newPrescriptions,
        });
      });
  };

  componentDidMount() {
    M.AutoInit();
    firebaseFunctions
      .onAuthStateChanged(this.props.history)
      .then(({ prescriptions, userDetails }) => {
        console.log(userDetails)
        this.setState({
          prescriptions,
          currentPrescription: prescriptions[0],
          userDetails,
        });
      });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Sidenav
          userDetails={this.state.userDetails}
          prescriptions={this.state.prescriptions}
          setCurrentPrescription={this.setCurrentPrescription}
        ></Sidenav>
        <Prescription
          currentPrescription={this.state.currentPrescription}
          deletePrescription={this.deletePrescription}
          deleteMedicine={this.deleteMedicine}
        ></Prescription>
        <AddMedicineModal addMedicine={this.addMedicine}></AddMedicineModal>
        <AddPrescriptionModal
          addPrescription={this.addPrescription}
        ></AddPrescriptionModal>
      </div>
    );
  }
}

export default Home;
