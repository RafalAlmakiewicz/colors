import ColorItem from "./colorItem";

interface Props {
  colors: string[];
  deleteColor: (color: string) => void;
}

const ColorList: React.FC<Props> = ({ colors, deleteColor }) => {
  return (
    <section className="list">
      {colors.map((color) => (
        <ColorItem key={color} color={color} deleteColor={deleteColor} />
      ))}
    </section>
  );
};

export default ColorList;
