"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import styles from "./index.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import Option from "@/components/shared/option";
import Select from "@/components/shared/select";
import api from "@/services/api";
import { dataset } from "@/services/api/models/stats";
import { factory } from "@/services/api/models";

import {
  IoBarChart as BarChart,
  IoAnalytics as LineChart,
} from "react-icons/io5";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
);

const options = {
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: false,
    },
  },
};

const Unit = {
  year: "year",
  month: "month",
  week: "week",
  day: "day",
};

const groupOptions = [
  { label: "年", value: Unit.year },
  { label: "月", value: Unit.month },
  { label: "週", value: Unit.week },
  { label: "日", value: Unit.day },
];

const ChartType = {
  bar: "bar",
  line: "line",
};

const chartOptions = [
  { label: <BarChart size="16px" />, value: ChartType.bar },
  { label: <LineChart size="16px" />, value: ChartType.line },
];

const defaultDate = () => {
  const now = dayjs();
  const end = now.add(3, "day").format("YYYY-MM-DD");
  const start = now.subtract(3, "day").format("YYYY-MM-DD");

  return { start, end };
};

const projects = [
  { value: "programming", label: "プログラミング" },
  { value: "english", label: "英語" },
  { value: "private", label: "プライベート" },
];

export default function Chart() {
  const [unit, setUnit] = useState(Unit.day);
  const [chartType, setChartType] = useState(ChartType.bar);
  const [date, setDate] = useState(defaultDate);
  const [project, setProject] = useState("all");
  const [data, setData] = useState([]);

  useEffect(() => {
    const init = async () => {
      const res = await api.fetchStats();

      const list = res.data.data.map((item) => factory.stats(item));
      const data = dataset(list, unit);
      setData(data);
    };

    init();
  }, []);

  if (data.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.control}>
          <div className={styles.group}>
            <Option
              data={chartOptions}
              value={chartType}
              onSelect={(item) => setChartType(item.value)}
            />
          </div>
        </div>
        <div className={styles.chart}>
          {
            {
              bar: <Bar options={options} data={data} />,
              line: <Line options={options} data={data} />,
            }[chartType]
          }
        </div>
      </div>
    </div>
  );
}