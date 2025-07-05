import { useState } from 'react'
import './index.css'

const frases = [
  {
    id: 1,
    inicio: "O candle de reversão apareceu exatamente onde ele...",
    resposta: "entrou",
    viés: "Viés de Confirmação",
    explicacao: "Você associou o candle com o ponto de entrada, buscando confirmação da decisão anterior."
  },
  {
    id: 2,
    inicio: "Mesmo com o preço contra, ele não saiu da operação porque...",
    resposta: "já tinha perdido muito",
    viés: "Aversão à Perda",
    explicacao: "Persistir na operação para evitar realizar uma perda já consolidada."
  },
  {
    id: 3,
    inicio: "O mercado rompeu o topo anterior, e ele pensou...",
    resposta: "não posso perder",
    viés: "Medo de Ficar de Fora (FOMO)",
    explicacao: "O impulso de entrar com medo de perder uma oportunidade."
  }
]

export default function App() {
  const [etapa, setEtapa] = useState(0)
  const [input, setInput] = useState('')
  const [mostrarResposta, setMostrarResposta] = useState(false)

  const fraseAtual = frases[etapa]

  function verificarResposta() {
    setMostrarResposta(true)
  }

  function proximaFrase() {
    setInput('')
    setMostrarResposta(false)
    setEtapa(etapa + 1)
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      {etapa < frases.length ? (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-bold">Frase {etapa + 1}</h2>
          <p className="text-lg">{fraseAtual.inicio}</p>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua palavra..."
            className="w-full border rounded px-4 py-2"
            disabled={mostrarResposta}
          />
          {!mostrarResposta ? (
            <button onClick={verificarResposta} className="bg-blue-600 text-white px-4 py-2 rounded">
              Ver Resposta
            </button>
          ) : (
            <div className="space-y-2">
              <p><strong>Resposta esperada:</strong> {fraseAtual.resposta}</p>
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

