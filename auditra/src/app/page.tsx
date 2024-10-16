"use client";

import { useState } from "react";
import Header from "../../components/header";
import ContractInput from "../../components/contract-input";
import ResultsModal from "../../components/results-modal";
import { analyzeContract } from "../../utils/ai-prompt"

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState("");
  const [results, setResults] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const analyze = async () => {
    console.log("Calling analyze Function");
    setIsModalOpen(true);
    await analyzeContract(contract, setResults, setLoading);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <Header />
      <ContractInput
        contract={contract}
        setContract={setContract}
        analyze={analyze}
      />
      <ResultsModal 
         closeModal={
          ( )=> setIsModalOpen(false)}
         isOpen={isModalOpen}
         results={results}
         loading={loading}
      />
    </main>
  );
}