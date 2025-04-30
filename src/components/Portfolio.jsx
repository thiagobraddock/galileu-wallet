import * as LucideIcons from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

function calculateCompoundInterest(amount, annualRate, months) {
  const years = months / 12;
  const finalAmount = amount * Math.pow(1 + annualRate / 100, years);
  return finalAmount.toFixed(2);
}

export default function Portfolio({ portfolio }) {
  return (
    <div className="bg-zinc-900 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">Meu Portfólio</h2>
      <ul className="space-y-4">
        {portfolio.length > 0 ? (
          portfolio.map((inv, index) => {
            const IconComponent = LucideIcons[inv.icone] || LucideIcons.Landmark;
            return (
              <li key={index} className="p-4 border border-zinc-800 rounded-lg bg-zinc-800 shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <IconComponent size={24} style={{ color: inv.cor }} />
                  <div>
                    <p className="text-lg font-bold text-white">{inv.nome}</p>
                    <p className="text-sm text-zinc-400">{inv.descricao}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="bg-green-300/10 text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                    Investido: {formatCurrency(inv.amount)}
                  </span>
                  <span className="bg-blue-300/10 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold mt-1">
                    Previsto: {formatCurrency(calculateCompoundInterest(inv.amount, inv.rentabilidadeAnual, inv.prazoMeses))}
                  </span>
                </div>
              </li>
            );
          })
        ) : (
          <p className="text-zinc-400">Nenhum investimento ainda.</p>
        )}
      </ul>
    </div>
  );
}
