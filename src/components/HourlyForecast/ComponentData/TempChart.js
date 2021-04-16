import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const TempChart = ({ data }) => {
  console.log(data);
  const lineChart =
    data.hourly && !!data.hourly.length && data.hourly ? (
      //     dailyData[3] && !!dailyData[3].data.length ? (
      <Line
        width={3520}
        height={120}
        data={{
          labels: data.hourly
            .filter((item) => {
              let date = new Date();
              let dateAPI = new Date(item.dateTime);
              const now = dateAPI >= date;
              return now;
            })
            .slice(0, 48)
            .map((item) =>
              new Date(item.dateTime).toLocaleString("pl-PL", {
                hour: "2-digit",
                minute: "2-digit",
              })
            ),
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
              data: data.hourly
                .filter((item) => {
                  let date = new Date();
                  let dateAPI = new Date(item.dateTime);
                  const now = dateAPI >= date;
                  return now;
                })
                .slice(0, 48)
                .map((item) => item.temperature),
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
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          elements: {
            point: {
              radius: 5,
            },
          },
          // layout: {
          //   margin: {
          //     left: -40,
          //     right: 0,
          //     top: 0,
          //     bottom: 0,
          //   },
          // },
          legend: {
            display: false,
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.yLabel;
              },
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: { display: true, z: 1 },
                ticks: {
                  //autoSkip: false,
                  maxRotation: 300,
                  minRotation: 30,
                  display: false,
                },
                offset: true,
                offsetGridLines: true,
              },
            ],
            yAxes: [
              {
                gridLines: { borderDash: [15, 18], display: true, z: 1 },
                ticks: {
                  suggestedMin: -5,
                  suggestedMax: 5,
                  display: false,
                },
              },
            ],
          },
        }}
      />
    ) : null;
  return <>{lineChart}</>;
};

export default TempChart;
