interface ColorFiltersProps {
  setFilter: (filter: string) => void;
}

const ColorFilters = ({ setFilter }: ColorFiltersProps) => {
  return (
    <section className="filters">
      <h2>Filters</h2>
      <label>
        Red &gt; 50%
        <input
          type="checkbox"
          name="filters"
          value="red"
          onChange={(e) => setFilter(e.target.value)}
        />
      </label>
      <label>
        Green &gt; 50%
        <input
          type="checkbox"
          name="filters"
          value="green"
          onChange={(e) => setFilter(e.target.value)}
        />
      </label>
      <label>
        Blue &gt; 50%
        <input
          type="checkbox"
          name="filters"
          value="blue"
          onChange={(e) => setFilter(e.target.value)}
        />
      </label>
      <label>
        Saturation &gt; 50%
        <input
          type="checkbox"
          name="filters"
          value="saturation"
          onChange={(e) => setFilter(e.target.value)}
        />
      </label>
    </section>
  );
};

export default ColorFilters;
