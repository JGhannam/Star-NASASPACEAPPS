import React, { useState } from "react";

//css
import "./errorsim.scss";

//react recoil + atom
import { useRecoilState } from "recoil";
import { ErrorList, Warning } from "../../atom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../redux/reducers/modelSlice";

function Errorsim() {
  const dispatch = useDispatch();
  const errorItems = useSelector((state) => state.model.errorList);
  const [errorList, setErrorList] = useRecoilState(ErrorList);
  const [warning, setWarning] = useRecoilState(Warning);
  const [ErrorInput, setErrorInput] = useState("");
  const [currentError, setCurrentError] = useState("");

  return (
    <div className="ErrorsimContainer">
      <h2>SIMULATION</h2>
      <h5>Common Errors:</h5>
      <div className="Errorsim">
        <button
          onClick={() => {
            setErrorList("Cylinder002");
            dispatch(setName("Cylinder002"));
          }}
        >
          Cylinder002
        </button>
        <button
          onClick={() => {
            setErrorList("Cylinder004");
            dispatch(setName("Cylinder004"));
          }}
        >
          Cylinder004
        </button>
        <button
          onClick={() => {
            setErrorList("Cylinder004_1");
            dispatch(setName("Cylinder004_1"));
          }}
        >
          Cylinder004_1
        </button>
        <button
          onClick={() => {
            setErrorList("Life support system error");
          }}
        >
          Life support system error
        </button>
        <button
          onClick={() => {
            setErrorList("Communication system error");
          }}
        >
          Communication system error
        </button>
        <button
          onClick={() => {
            setErrorList("Cube");
            dispatch(setName("Cube"));
          }}
        >
          Cube
        </button>
      </div>
      <form
        className="Errorsim"
        onSubmit={(e) => {
          e.preventDefault();
          setErrorList(ErrorInput);
          setErrorInput("");
        }}
      >
        <h5>Custom Error:</h5>
        <input
          type="text"
          placeholder="Enter error message"
          onChange={(e) => setErrorInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {/* write a selector with the error items */}
      <h5>All Errors:</h5>
      <div className="Errorsim">
        <select
          name="errors"
          id="errors"
          value={currentError}
          onChange={(e) => {
            setErrorList(e.target.value);
            dispatch(setName(e.target.value));
            setCurrentError(e.target.value);
          }}
        >
          {errorItems.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>


      {/* Warnings */}

      <h5>Common Warnings:</h5>
      <div className="Errorsim">
        <button
          onClick={() => {
            setWarning("Oxygen Level Low");
          }}
        >
          Oxygen Level Low
        </button>
        <button
          onClick={() => {
            setWarning("Cabin Pressure Drop");
          }}
        >
          Cabin Pressure Drop
        </button>
        <button
          onClick={() => {
            setWarning("Incoming Asteroid");
          }}
        >
          Incoming Asteroid
        </button>
        <button
          onClick={() => {
            setWarning("Solar Flare Warning");
          }}
        >
          Solar Flare Warning
        </button>
      </div>
    </div>
  );
}

export default Errorsim;
