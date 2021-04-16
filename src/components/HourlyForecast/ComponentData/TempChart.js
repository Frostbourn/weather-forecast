import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const TempChart = ({ data }) => {
  const lineChart = (
    //     dailyData[3] && !!dailyData[3].data.length ? (
    <Line
      width={3120}
      height={120}
      data={{
        //           labels: "etykieta",
        //           datasets: [
        //             {
        //               label: "Total Confirmed",
        //               data: "1, 2, 3",
        //               borderColor: "rgb(22 133 255)",
        //               backgroundColor: "transparent",
        //               pointBackgroundColor: "rgb(22 133 255)",
        //               pointBorderColor: "rgb(22 133 255)",
        //             },
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          // {
          //   label: "Total Recovered",
          //   data: dailyData[3].data.map((data) => data.totalRecovered),
          //   borderColor: "rgb(87 213 151)",
          //   backgroundColor: "transparent",
          //   pointBackgroundColor: "rgb(87 213 151)",
          //   pointBorderColor: "rgb(87 213 151)",
          // },
          // {
          //   label: "Total Deaths",
          //   data: dailyData[3].data.map((data) => data.totalDeaths),
          //   borderColor: "rgb(255 65 105)",
          //   backgroundColor: "transparent",
          //   pointBackgroundColor: "rgb(255 65 105)",
          //   pointBorderColor: "rgb(255 65 105)",
          //     // },
        ],
        // }}
        //     options={{
        //       responsive: true,
        //       maintainAspectRatio: true,
        //       elements: {
        //         point: {
        //           radius: 5,
        //         },
        //       },
        //       tooltips: {
        //         callbacks: {
        //           label: function (tooltipItem, data) {
        //             return tooltipItem.yLabel.toLocaleString();
        //           },
        //         },
        //       },
        //       legend: {
        //         display: true,
        //         labels: {
        //           usePointStyle: true,
        //         },
        //       },
        //       scales: {
        //         xAxes: [
        //           {
        //             type: "time",
        //             time: {
        //               unit: "month",
        //               displayFormats: {
        //                 quarter: "MMM YYYY",
        //               },
        //             },
        //           },
        //         ],
        //     yAxes: [
        //       {
        //         display: true,
        //         ticks: {
        //           min: 0,
        //           max: 160000000,
        //           stepSize: 40000000,
        //           callback: function (value, index, values) {
        //             if (value >= 1000) {
        //               return nFormat(value);
        //             } else {
        //               return value;
        //             }
        //           },
        //         },
        //       },
        //     ],
        //   },
        //  }}
      }}
    />
  );
  // ) : null;
  return <>{lineChart}</>;
};

export default TempChart;
