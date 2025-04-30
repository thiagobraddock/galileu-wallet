import { useState } from "react";

export default function InvestmentModal({ investment, onClose, onInvest }) {
  const [amount, setAmount] = useState("");

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded-lg shadow-lg text-white w-96 max-w-md">
        <h2 className="text-xl font-bold mb-2">Investir em {investment.nome}</h2>
        <p className="mb-2 text-zinc-400">{investment.descricao}</p>
        <label className="block mb-2">Valor a Investir:</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          className="p-2 rounded bg-zinc-800 text-white w-full border border-zinc-700"
        />
        <div className="mt-4 flex justify-end">
          <button 
            onClick={() => { onInvest(investment, Number(amount)); onClose(); }} 
            className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2">
            Confirmar
          </button>
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
