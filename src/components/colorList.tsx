import ColorItem from "./colorItem";

interface ColorListProps {
  colors: string[];
  deleteColor: (color: string) => void;
}

const ColorList = ({ colors, deleteColor }: ColorListProps) => {
  return (
    <section className="list">
      {colors.map((color) => (
        <ColorItem key={color} color={color} deleteColor={deleteColor} />
      ))}
    </section>
  );
};

export default ColorList;
