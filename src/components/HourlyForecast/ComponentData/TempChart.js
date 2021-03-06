import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.plugins.register(ChartDataLabels);

const TempChart = ({ data }) => {
  const maxTemp =
    data.hourly && !!data.hourly.length && data.hourly
      ? Math.max(...data.hourly.map((item) => item.temperature), 0)
      : "";

  const minTemp =
    data.hourly && !!data.hourly.length && data.hourly
      ? Math.min(...data.hourly.map((item) => item.temperature), 0)
      : "";

  const lineChart =
    data.hourly && !!data.hourly.length && data.hourly ? (
      //     dailyData[3] && !!dailyData[3].data.length ? (
      <Line
        width={3520}
        height={100}
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
              borderColor: "#4b86c0",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              borderWidth: 1,
              pointBorderColor: "#4b86c0",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 1,
              pointHoverBackgroundColor: "#4b86c0",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 1,
              pointRadius: 1,
              pointHitRadius: 1,
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
            enabled: false,
            mode: "nearest",
            intersect: false,
            callbacks: {
              label: (item) => `${item.yLabel} ??`,
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: { display: false },
                ticks: {
                  display: false,
                },
                offset: true,
                offsetGridLines: true,
              },
            ],
            yAxes: [
              {
                gridLines: { borderDash: [15, 18], display: true },
                ticks: {
                  suggestedMin: minTemp - 3,
                  suggestedMax: maxTemp + 3,
                  display: false,
                },
              },
            ],
          },
          plugins: {
            datalabels: {
              anchor: "end",
              align: "top",
              formatter: Math.round,
              textShadowBlur: 0,
            },
          },
        }}
      />
    ) : null;
  return <>{lineChart}</>;
};

export default TempChart;
