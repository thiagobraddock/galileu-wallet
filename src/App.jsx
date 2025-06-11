import Logo from './assets/Logo.svg';
import LogoGali from './assets/logo-gali.png';
import Balance from './components/Balance';
import ListaDeInvestimentos from './components/ListaDeInvestimentos';
import Portfolio from './components/Portfolio';
import data from './data/investments.json';
import { useState } from "react";

export default function App() {
  const [carteira, setCarteira] = useState([]);
  const [saldo, setSaldo] = useState(10000);

  function investir(investimento) {
    const valor = Number(prompt("Qual valor deseja investir?"));
    if (!valor || valor < investimento.investimentoMinimo) {
      alert(`Valor mínimo: ${investimento.investimentoMinimo}`);
      return;
    }
    if (valor > saldo) {
      alert("Saldo insuficiente.");
      return;
    }
    setSaldo(s => s - valor);
    setCarteira(prev => {
      const existente = prev.find(i => i.id === investimento.id);
      if (existente) {
        return prev.map(i => i.id === investimento.id ? { ...i, valorInvestido: i.valorInvestido + valor } : i);
      }
      return [...prev, { ...investimento, valorInvestido: valor }];
    });
  }

  const totalInvestido = carteira.reduce((soma, inv) => soma + inv.valorInvestido, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center mb-6 gap-6 justify-between">
          <img src={Logo} width="170px" />
          <img src={LogoGali} width="270px" />
        </header>
        <Balance balance={saldo} totalInvested={totalInvestido} portfolio={carteira} totalAssets={carteira.length} />
        {/* Portfolio simplificado */}
        <Portfolio portfolio={carteira} />
        <ListaDeInvestimentos 
          investimentos={data} 
          onInvest={investir} 
        />
      </div>
    </div>
  );
}