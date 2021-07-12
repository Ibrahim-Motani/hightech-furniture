import "../../../node_modules/react-vis/dist/style.css";
import { RadialChart } from "react-vis";

const Chart = () => {
  const myData = [
    { angle: 1, label: "expense", subLabel: "With annotation" },
    { angle: 5, label: "sales" },
    { angle: 2, label: "purchases" },
  ];

  return (
    <div style={{ marginTop: "15px" }}>
      {/* <XYPlot height={300} width={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries data={data} color="red" />
        <LineSeries data={data} color="purple" />
        <LineSeries data={data} color="yellow" />
      </XYPlot> */}
      <RadialChart data={myData} width={300} height={300} />
    </div>
  );
};

export default Chart;
