export default function Portfolio({ portfolio }) {
  if (!portfolio.length) return null;
  return (
    <div className="bg-zinc-900 p-4 rounded-lg mb-6">
      <h2 className="text-lg font-bold mb-2">Meus Investimentos</h2>
      <ul>
        {portfolio.map((inv) => (
          <li key={inv.id} className="flex justify-between border-b border-zinc-800 py-2">
            <span>{inv.nome}</span>
            <span className="font-semibold text-green-400">R$ {inv.valorInvestido}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}