// App com página principal e seleção de respostas - Neurotrading

import { useState } from 'react'

const frases = [
  {
    id: 1,
    inicio: "O candle de reversão apareceu exatamente onde ele...",
    opcoes: ["entrou", "esperava", "ficou", "travou"],
    resposta: "entrou",
    viés: "Viés de Confirmação",
    explicacao: "Você associou o candle com o ponto de entrada, buscando confirmação da decisão anterior."
  },
  {
    id: 2,
    inicio: "Mesmo com o preço contra, ele não saiu da operação porque...",
    opcoes: ["acreditava", "já tinha perdido muito", "confiava", "tinha esperança"],
    resposta: "já tinha perdido muito",
    viés: "Aversão à Perda",
    explicacao: "Persistir na operação para evitar realizar uma perda já consolidada."
  },
  {
    id: 3,
    inicio: "O mercado rompeu o topo anterior, e ele pensou...",
    opcoes: ["não posso perder", "vai disparar", "eu sabia", "vou vender"],
    resposta: "não posso perder",
    viés: "Medo de Ficar de Fora (FOMO)",
    explicacao: "O impulso de entrar com medo de perder uma oportunidade."
  }
]

export default function App() {
  const [iniciado, setIniciado] = useState(false)
  const [etapa, setEtapa] = useState(0)
  const [respostaSelecionada, setRespostaSelecionada] = useState(null)
  const [mostrarResposta, setMostrarResposta] = useState(false)

  const fraseAtual = frases[etapa]

  function verificarResposta() {
    setMostrarResposta(true)
  }

  function proximaFrase() {
    setRespostaSelecionada(null)
    setMostrarResposta(false)
    setEtapa(etapa + 1)
  }

  if (!iniciado) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Neurotrading Intensive</h1>
        <p className="text-lg mb-6">Treinamento de Leitura Preditiva para Traders</p>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded text-lg"
          onClick={() => setIniciado(true)}
        >
          Começar
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      {etapa < frases.length ? (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-bold">Frase {etapa + 1}</h2>
          <p className="text-lg">{fraseAtual.inicio}</p>
          <div className="space-y-2">
            {fraseAtual.opcoes.map((opcao, index) => (
              <label key={index} className="block">
                <input
                  type="radio"
                  name="resposta"
                  value={opcao}
                  checked={respostaSelecionada === opcao}
                  onChange={() => setRespostaSelecionada(opcao)}
                  disabled={mostrarResposta}
                  className="mr-2"
                />
                {opcao}
              </label>
            ))}
          </div>
          {!mostrarResposta ? (
            <button
              onClick={verificarResposta}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
              disabled={!respostaSelecionada}
            >
              Ver Resposta
            </button>
          ) : (
            <div className="space-y-2 mt-4">
              <p><strong>Resposta correta:</strong> {fraseAtual.resposta}</p>
              <p><strong>Sua resposta:</strong> {respostaSelecionada}</p>
              <p><strong>Viés identificado:</strong> {fraseAtual.viés}</p>
              <p className="italic text-sm">{fraseAtual.explicacao}</p>
              <button onClick={proximaFrase} className="bg-green-600 text-white px-4 py-2 rounded">
                Próxima Frase
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Fim do Jogo</h2>
          <p className="text-lg">Parabéns por completar o treino de leitura preditiva!</p>
        </div>
      )}
    </div>
  )
}
