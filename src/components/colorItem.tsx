import React, { useEffect } from "react";

interface ColorItemProps {
  color: string;
  deleteColor: (color: string) => void;
}

const ColorItem = ({ color, deleteColor }: ColorItemProps) => {
  useEffect(() => {
    const colorSquare: HTMLElement | null = document.querySelector(
      `[data-color="${color}"]`
    );
    if (!colorSquare) return;
    colorSquare.style.setProperty("--bg-color", color);
  }, []);

  const isUserColor = () => {
    let json = localStorage.getItem("userColors");
    if (!json) return false;
    let userColors: string[] = JSON.parse(json);
    if (userColors.includes(color)) return true;
    return false;
  };

  return (
    <div className="list-item">
      <div className="color-square" data-color={color}></div>
      <p>{color}</p>
      {isUserColor() && <button onClick={() => deleteColor(color)}>X</button>}
    </div>
  );
};

export default ColorItem;
