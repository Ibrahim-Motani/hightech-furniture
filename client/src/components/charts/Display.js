import React from "react";
import { useContext } from "react";
import DataContext from "../../store/data-context";
import { Chart } from "react-google-charts";

function Display() {
  const { totalExpenses, totalPurchases, totalSales } =
    useContext(DataContext);

  return (
    <Chart
      width={"400px"}
      height={"400px"}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={[
        ["Task", "Hours per Day"],
        ["Expense", totalExpenses],
        ["Purchases", totalPurchases],
        ["Sales", totalSales],
      ]}
      options={{
        // Just add this option
        is3D: true,
      }}
      rootProps={{ "data-testid": "2" }}
    />
  );
}

export default Display;
