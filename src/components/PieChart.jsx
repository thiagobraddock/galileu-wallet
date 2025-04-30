import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartComponent({ portfolio }) {
  const totalAmount = portfolio.reduce((sum, inv) => sum + inv.amount, 0);

  const chartData = {
    labels: portfolio.map(inv => inv.nome),
    datasets: [
      {
        data: portfolio.map(inv => inv.amount),
        backgroundColor: portfolio.map(inv => inv.cor),
        borderColor: "#1f2937",
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false }, // Mantemos as legendas fora do gráfico
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            let value = tooltipItem.raw;
            let percentage = ((value / totalAmount) * 100).toFixed(1);
            return `${percentage}%`; // Exibe a porcentagem no tooltip
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-48 h-48">
        <Pie data={chartData} options={chartOptions} />
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {portfolio.map((inv, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}></div>
            <span className="text-gray-300 text-sm">{inv.nome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}