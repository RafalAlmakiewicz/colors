import React, { useState } from "react";
import { formatColor } from "../helpers";

interface Props {
  addColor: (color: string) => void;
  colors: string[];
}

const ColorForm: React.FC<Props> = ({ addColor, colors }) => {
  const [newColor, setNewColor] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let color = formatColor(newColor);
    if (colors.includes(color)) {
      setError("A duplicate color!");
      return;
    }
    if (color.match("^#[0-9A-F]{6}$")) {
      const userColors: string[] = JSON.parse(
        localStorage.getItem("userColors") as string
      );
      userColors.push(color);
      localStorage.setItem("userColors", JSON.stringify(userColors));
      setError("");
      addColor(color);
    } else setError("Invalid color!");
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    if (!value.match("^#?[0-9A-Fa-f]{0,6}$")) return;
    setNewColor(value);
  };

  return (
    <section className="form-container">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="color">New Hex color</label>
        <input
          id="color"
          type="text"
          value={newColor}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </section>
  );
};

export default ColorForm;
