import React, { Component } from "react";
import M from "materialize-css";

import firebaseFunctions from "../firebase";
import Sidenav from "../components/Home/Sidenav";
import Navbar from "../components/Home/Navbar";

export class Home extends Component {
  state = {
    currentPrescription: null,

    prescriptions: [
      {
        name: "Test",
        id: "1",
        userId: "1",
      },
    ],
  };

  setCurrentPrescription = (prescriptionId) => {
    console.log(prescriptionId)
    let selectedPrescription = this.state.prescriptions.filter(
      (prescription) => {
        return prescription.id === prescriptionId;
      }
    );

    console.log(selectedPrescription[0])
    this.setState({
      currentPrescription: selectedPrescription[0],
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
      </div>
    );
  }
}

export default Home;
