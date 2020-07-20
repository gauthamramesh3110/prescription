import React from "react";

export default function MedicineSchedule({ medicines }) {
  let medicineScheduleStyle = {
    marginBottom: "50px",
  };

  let Schedule = (medicine) => {
    let colSize = 12 / medicine.schedule.length;
    return (
      <div className="row">
        {medicine.schedule.map((isScheduled, index) => {
          let colClass = "center-align col " + "s" + colSize;
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

  return medicines != null ? (
    medicines.map((medicine, index) => {
      return (
        <div key={index} style={medicineScheduleStyle}>
          <h6 className="left-align">{medicine.name}</h6>
          {Schedule(medicine)}
        </div>
      );
    })
  ) : (
    <div>nope</div>
  );
}
