import React from "react";
import "./styles/styles.scss";
import ColorFilters from "./components/colorFilters";
import ColorForm from "./components/colorForm";
import ColorList from "./components/colorList";
import Header from "./components/header";
import {
  Saturation,
  redValue,
  greenValue,
  blueValue,
  hexToRgb,
  formatColor,
  unique,
} from "./helpers";
import defaultColors from "./defaultColors";

interface AppState {
  colors: string[];
  filters: string[];
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    colors: [],
    filters: [],
  };

  componentDidMount() {
    if (!localStorage.getItem("userColors"))
      localStorage.setItem("userColors", "[]");
    this.setState(
      {
        colors: [
          ...defaultColors.map((c) => formatColor(c)).filter(unique),
          ...JSON.parse(localStorage.getItem("userColors") as string),
        ],
      },
      this.orderColors
    );
  }

  filterColors = () => {
    let colors = [...this.state.colors];
    for (let filter of this.state.filters) {
      switch (filter) {
        case "red":
          colors = colors.filter((color) => redValue(color) > 127);
          break;
        case "green":
          colors = colors.filter((color) => greenValue(color) > 127);
          break;
        case "blue":
          colors = colors.filter((color) => blueValue(color) > 127);
          break;
        case "saturation":
          colors = colors.filter((color) => Saturation(color) > 50);
          break;
      }
    }
    return colors;
  };

  orderColors = () => {
    let colors = [...this.state.colors];
    colors.sort((color1, color2) => {
      const [r1, g1, b1] = hexToRgb(color1);
      const [r2, g2, b2] = hexToRgb(color2);
      if (r1 > r2) return -1;
      else if (r1 < r2) return 1;
      else if (g1 > g2) return -1;
      else if (g1 < g2) return 1;
      else if (b1 > b2) return -1;
      else if (b1 < b2) return 1;
      return 0;
    });
    this.setState({ colors });
  };

  setFilter = (filter: string) => {
    let filters = [...this.state.filters];
    if (filters.includes(filter)) filters = filters.filter((f) => f !== filter);
    else filters.push(filter);
    this.setState({ filters });
  };

  deleteColor = (color: string) => {
    let userColors: string[] = JSON.parse(
      localStorage.getItem("userColors") as string
    );
    localStorage.setItem(
      "userColors",
      JSON.stringify(userColors.filter((c) => c !== color))
    );
    let colors = [...this.state.colors];
    this.setState({ colors: colors.filter((c) => c !== color) });
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <main>
          <ColorForm
            colors={this.state.colors}
            addColor={(color) =>
              this.setState(
                { colors: [...this.state.colors, color] },
                this.orderColors
              )
            }
          />
          <ColorFilters setFilter={this.setFilter} />
          <ColorList
            colors={this.filterColors()}
            deleteColor={this.deleteColor}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
