import { useContext } from "react";

import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit";

import "./ToggleSwitch.css";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );
  console.log(currentTemperatureUnit);
  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch__checkbox"
      ></input>

      <span className="toggle-switch__circle"></span>
      <span
        style={{ color: `${currentTemperatureUnit === "F" ? "white" : ""}` }}
        className={`toggle-switch__text toggle-switch__text_F ${
          currentTemperatureUnit === "F" ? "toggle-switch_text_color_white" : ""
        }`}
      >
        F
      </span>
      <span
        style={{ color: `${currentTemperatureUnit === "C" ? "white" : ""}` }}
        className={`toggle-switch__text toggle-switch__text_C ${
          currentTemperatureUnit === "F" ? "toggle-switch_text_color_white" : ""
        }`}
      >
        C
      </span>
    </label>
  );
}
