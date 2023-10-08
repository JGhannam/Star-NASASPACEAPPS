import React, { useEffect, useState } from "react";

//recoil
import { useRecoilState } from "recoil";
import { ErrorList, Warning } from "../../atom";
import { CRoomWarning, CRoomError } from "../../atom";

//css
import "./controlroom.scss";
import { useSelector } from "react-redux";

function ControlRoom() {
  const [errorList, setErrorList] = useRecoilState(ErrorList);
  const [warning, setWarning] = useRecoilState(Warning);
  const [CRoomWarningStorage, setCRoomWarning] = useRecoilState(CRoomWarning);
  const [CRoomErrorStorage, setCRoomError] = useRecoilState(CRoomError);
  const allErrors = useSelector((state) => state.model.errorList);
  
  useEffect(() => {
    console.log(CRoomErrorStorage);
      setErrorList("");
      setWarning("");
  }, [warning, errorList]);

  return (
    <div className="ControlRoomContainer">
      <div className="ExpectedError">
        <h3>Expected Issue:</h3>
        {<h4>{CRoomWarningStorage ? "Warning: " + CRoomWarningStorage : "0 Warnings"}</h4>}
      </div>
      <div className="ControlRoomMessage ">
        <h3>Control Room</h3>
        {CRoomErrorStorage ? <h4>{CRoomErrorStorage}</h4> : <h4>0 Errors</h4>}
      </div>
    </div>
  );
}

export default ControlRoom;
