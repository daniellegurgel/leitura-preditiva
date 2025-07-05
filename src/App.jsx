// App Neurotrading – 25 frases com análise de viés prevalente

import { useState } from 'react'

const frases = [
  {
    id: 1,
    inicio: "O candle de reversão apareceu exatamente onde ele...",
    opcoes: [
      { texto: "entrou", vies: "Viés de Confirmação" },
      { texto: "estava torcendo", vies: "Otimismo Ilusório" },
      { texto: "hesitou", vies: "Aversão à Perda" },
      { texto: "pulou a entrada de ontem", vies: "Viés de Recência" }
    ]
  },
  {
    id: 2,
    inicio: "Mesmo com o preço contra, ele não saiu da operação porque...",
    opcoes: [
      { texto: "já tinha perdido muito", vies: "Aversão à Perda" },
      { texto: "acreditava que ia voltar", vies: "Viés de Confirmação" },
      { texto: "não quis perder a chance", vies: "FOMO" },
      { texto: "ontem aconteceu igual e voltou", vies: "Viés de Recência" }
    ]
  },
  {
    id: 3,
    inicio: "O mercado rompeu o topo anterior e ele pensou...",
    opcoes: [
      { texto: "agora vai disparar!", vies: "Otimismo Ilusório" },
      { texto: "já vi isso antes", vies: "Viés de Retrospectiva" },
      { texto: "não posso ficar de fora", vies: "FOMO" },
      { texto: "eu sabia", vies: "Excesso de Confiança" }
    ]
  },
  {
    id: 4,
    inicio: "Mesmo com sinais contrários, ele manteve a operação porque...",
    opcoes: [
      { texto: "queria provar que estava certo", vies: "Viés de Confirmação" },
      { texto: "já estava no prejuízo", vies: "Aversão à Perda" },
      { texto: "achava que tinha mais chance de dar certo", vies: "Otimismo Ilusório" },
      { texto: "fez isso no dia anterior e funcionou", vies: "Viés de Recência" }
    ]
  },
  {
    id: 5,
    inicio: "Ele decidiu encerrar a operação quando...",
    opcoes: [
      { texto: "chegou no valor que ele tinha em mente", vies: "Efeito de Ancoragem" },
      { texto: "lembrou da última vez que perdeu tudo", vies: "Viés de Retrospectiva" },
      { texto: "a maioria no grupo também saiu", vies: "FOMO" },
      { texto: "o medo de entregar o lucro bateu", vies: "Aversão à Perda" }
    ]
  },
  // Adicionar frases 6 a 25 aqui seguindo o mesmo padrão
]

export default function App() {
  const [iniciado, setIniciado] = useState(false)
  const [etapa, setEtapa] = useState(0)
  const [respostaSelecionada, setRespostaSelecionada] = useState(null)
  const [mostrarResposta, setMostrarResposta] = useState(false)
  const [respostas, setRespostas] = useState([])

  const fraseAtual = frases[etapa]
  const total = frases.length

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
    const principal = ordenado[0]

    return (
      <>
        <p className="text-lg mb-2">Viés mais prevalente: <strong>{principal[0]}</strong> ({principal[1]} ocorrências)</p>
        <div className="mt-4 space-y-1">
          {ordenado.map(([vies, qtd], i) => (
            <p key={i}><strong>{vies}:</strong> {qtd} ocorrência(s)</p>
          ))}
        </div>
      </>
    )
  }

  if (!iniciado) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Neurotrading Intensive</h1>
        <p className="text-lg mb-6">Scanner de Vieses Comportamentais para Traders</p>
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
      {etapa < total ? (
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-bold">Frase {etapa + 1} de {total}</h2>
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
          {gerarResumo()}
        </div>
      )}
    </div>
  )
}
