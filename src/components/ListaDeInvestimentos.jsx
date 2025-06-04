import * as LucideIcons from "lucide-react";

export default function ListaDeInvestimentos({ investimentos, onInvest }) {
  return (
    <div className="bg-zinc-900 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Investimentos Disponíveis</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {investimentos.map((inv) => {
          const IconComponent = LucideIcons[inv.icone] || LucideIcons.Landmark; // Ícone dinâmico do JSON
          const RiskIcon = LucideIcons.ChartNoAxesColumnIncreasing; // Ícone de gráfico de 3 barrinhas
          const FgcIcon = inv.fgc ? LucideIcons.Check : LucideIcons.X; // Ícone de check ou x
          const fgcColor = inv.fgc ? 'text-green-500' : 'text-red-500'; // Cor do ícone de FGC
          return (
            <div key={inv.id} className="p-6 border border-zinc-800 rounded-lg bg-zinc-800 shadow-md flex flex-col">
              <div className="flex items-center mb-3">
                <IconComponent size={24} style={{ color: inv.cor }} />
                <p className="text-lg font-bold ml-2" style={{ color: inv.cor }}>{inv.nome}</p>
                <span className="p-1 flex items-center ml-2 rounded-lg border border-zinc-700">
                  <RiskIcon size={16} className=" text-yellow-400 " />
                  <span className="text-xs text-zinc-400 ml-1">risco {inv.risco}</span>
                </span>
              </div>
              
              <p className="text-sm text-zinc-400 mb-1">{inv.descricao}</p>
              <div className="text-xs mt-2 space-y-2"> {/* Adiciona espaço entre os elementos */}
                <div className="flex justify-between">
                  <span>Taxa (a.a)</span>
                  <span className="text-green-400">{inv.rentabilidadeAnual}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>FGC:</span>
                  <FgcIcon size={16} className={fgcColor} />
                </div>
                <div className="flex justify-between">
                  <span>Vencimento</span>
                  <span>{inv.prazoMeses} meses</span>
                </div>
              </div>
              <button
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg mt-4"
                onClick={() => onInvest(inv)}
              >
                Investir
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}