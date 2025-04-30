import PieChartComponent from "./PieChart";


export default function Balance({ balance, totalInvested, totalAssets, portfolio }) {
  return (
    <div className="bg-neutral-900 p-6 rounded-lg shadow-md mb-6">
      <h1 className="text-4xl font-bold text-center mb-6">Educação Financeira</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Coluna 1 - Saldo */}
        <div className="flex flex-col">
          <p className="text-lg text-gray-400">Saldo Disponível</p>
          <p className="text-4xl font-bold text-white">{balance}</p>
          <p className="text-lg text-blue-400 mt-1">+ {totalInvested} Investidos</p>
        </div>

        {/* Coluna 2 - Valor Investido e Retorno Médio */}
        <div className="flex flex-col">
          <p className="text-lg text-gray-400">Valor Investido</p>
          <p className="text-4xl font-bold text-white">{totalInvested}</p>
          <p className="text-lg text-green-400 mt-1">Retorno Médio: {totalAssets > 0 ? ((portfolio.reduce((acc, inv) => acc + inv.rentabilidadeAnual, 0) / totalAssets).toFixed(1) + '%') : '0%'}</p>
        </div>

        {/* Coluna 3 - Gráfico */}
        <div className="flex justify-center md:justify-end">
          <PieChartComponent portfolio={portfolio} />
        </div>
      </div>
    </div>
  );
}