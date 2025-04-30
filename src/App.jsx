import { useState, useEffect } from "react";
import investmentsData from "./data/investments.json";
import configData from "./data/config.json";
import InvestmentList from "./components/InvestmentList";
import Portfolio from "./components/Portfolio";
import InvestmentModal from "./components/InvestmentModal";
import Balance from "./components/Balance";
import Logo from './assets/Logo.svg';
import LogoGali from './assets/logo-gali.png';
import { formatCurrency } from "./utils/formatCurrency";

export default function App() {
  const [balance, setBalance] = useState(configData.initialBalance);
  const [investments, setInvestments] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  useEffect(() => {
    setInvestments(investmentsData);
  }, []);

  const totalInvested = portfolio.reduce((sum, inv) => sum + inv.amount, 0);
  const totalAssets = portfolio.length;

  const handleInvest = (investment, amount) => {
    if (balance >= amount) {
      setBalance(balance - amount);
      setPortfolio(prev => {
        const existing = prev.find(inv => inv.id === investment.id);
        return existing ? prev.map(inv => inv.id === investment.id ? { ...inv, amount: inv.amount + amount } : inv) : [...prev, { ...investment, amount }];
      });
    } else {
      alert("Saldo insuficiente para este investimento.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6 gap-6 justify-center">
          <img src={Logo} alt="Logo" className="h-10" />
          <img src={LogoGali} alt="Logo Gali" className="h-16" />
        </div>
        <Balance balance={formatCurrency(balance)} totalInvested={formatCurrency(totalInvested)} totalAssets={totalAssets} portfolio={portfolio} />
        <Portfolio portfolio={portfolio} />
        <InvestmentList investments={investments} onInvest={setSelectedInvestment} />
        {selectedInvestment && <InvestmentModal investment={selectedInvestment} onClose={() => setSelectedInvestment(null)} onInvest={handleInvest} />}
      </div>
    </div>
  );
}