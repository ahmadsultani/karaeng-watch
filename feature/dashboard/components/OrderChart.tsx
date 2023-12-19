import { BarElement } from "chart.js";

import { CircularProgress, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ChartOptions,
  ChartData,
} from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { getDailyRevenue } from "../service";
import { EmptyWrapper } from "@/components/Wrapper/styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options: ChartOptions<"bar"> = {
  maintainAspectRatio: true,
  plugins: {
    title: { display: false },
    legend: {
      display: true,
      position: "top",
      labels: {
        font: {
          size: 10,
        },
      },
      align: "end",
    },
  },
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    y: {
      type: "linear",
      position: "left",
      beginAtZero: true,
      grid: {
        drawOnChartArea: false,
        drawTicks: false,
      },
      offset: true,
    },
    x: {
      offset: true,
      grid: {
        drawTicks: false,
      },
    },
  },
};

export const OrderChart: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["order-chart"],
    queryFn: () =>
      getDailyRevenue().then((data) => {
        return {
          labels: Object.entries(data)
            .sort()
            .map(([key]) => key),
          datasets: [
            {
              label: "Order",
              data: Object.entries(data)
                .sort()
                .map(([, value]) => value),
              backgroundColor: "#FFC107",
            },
          ],
        };
      }),
  });

  return isLoading ? (
    <EmptyWrapper>
      <CircularProgress />
    </EmptyWrapper>
  ) : isError ? (
    <EmptyWrapper>
      <Typography>Error Fetching Data</Typography>
    </EmptyWrapper>
  ) : (
    <Bar data={data as ChartData<"bar">} options={options} />
  );
};
