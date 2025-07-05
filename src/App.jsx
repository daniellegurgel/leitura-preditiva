// App como scanner de viés emocional - Neurotrading

import { useState } from 'react'

const frases = [
  {
    id: 1,
    inicio: "O candle de reversão apareceu exatamente onde ele...",
    opcoes: [
      { texto: "entrou", vies: "Viés de Confirmação" },
      { texto: "esperava", vies: "Viés de Otimismo" },
      { texto: "ficou", vies: "Viés de Aversão à Perda" },
      { texto: "travou", vies: "Paralisia Decisória" }
    ]
  },
  {
    id: 2,
    inicio: "Mesmo com o preço contra, ele não saiu da operação porque...",
    opcoes: [
      { texto: "acreditava", vies: "Viés de Confirmação" },
      { texto: "já tinha perdido muito", vies: "Aversão à Perda" },
      { texto: "confiava", vies: "Viés de Otimismo" },
      { texto: "tinha esperança", vies: "Falsa Expectativa" }
    ]
  },
  {
    id: 3,
    inicio: "O mercado rompeu o topo anterior, e ele pensou...",
    opcoes: [
      { texto: "não posso perder", vies: "FOMO" },
      { texto: "vai disparar", vies: "Viés de Otimismo" },
      { texto: "eu sabia", vies: "Viés de Confirmação" },
      { texto: "vou vender", vies: "Viés de Aversão ao Sucesso" }
    ]
  }
]

export default function App() {
  const [iniciado, setIniciado] = useState(false)
  const [etapa, setEtapa] = useState(0)
  const [respostaSelecionada, setRespostaSelecionada] = useState(null)
  const [mostrarResposta, setMostrarResposta] = useState(false)
  const [respostas, setRespostas] = useState([])

  const fraseAtual = frases[etapa]

  function verificarResposta() {
    setMostrarResposta(true)
    setRespostas([...respostas, respostaSelecionada])
  }

  function proximaFrase() {
    setRespostaSelecionada(null)
    setMostrarResposta(false)
    setEtapa(etapa + 1)
  }

  function gerarResumo() {
    const contagem = {}
    respostas.forEach((resp) => {
      if (!contagem[resp.vies]) contagem[resp.vies] = 0
      contagem[resp.vies]++
    })
    const ordenado = Object.entries(contagem).sort((a, b) => b[1] - a[1])
    return ordenado.map(([vies, qtd], i) => (
      <p key={i}><strong>{vies}:</strong> {qtd} ocorrência(s)</p>
    ))
  }

  if (!iniciado) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Neurotrading Intensive</h1>
        <p className="text-lg mb-6">Scanner de Viés Emocional para Traders</p>
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
                  value={opcao.texto}
                  checked={respostaSelecionada === opcao}
                  onChange={() => setRespostaSelecionada(opcao)}
                  disabled={mostrarResposta}
                  className="mr-2"
                />
                {opcao.texto}
              </label>
            ))}
          </div>
          {!mostrarResposta ? (
            <button
              onClick={verificarResposta}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
              disabled={!respostaSelecionada}
            >
              Analisar Viés
            </button>
          ) : (
            <div className="space-y-2 mt-4">
              <p><strong>Você demonstrou:</strong> {respostaSelecionada.vies}</p>
              <button onClick={proximaFrase} className="bg-green-600 text-white px-4 py-2 rounded">
                Próxima Frase
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-2xl font-bold mb-4">Análise Final</h2>
          <p className="text-lg mb-2">Veja os vieses mais acionados por você:</p>
          {gerarResumo()}
        </div>
      )}
    </div>
  )
}
