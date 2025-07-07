import { useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip as ChartJSTooltip, Legend } from 'chart.js';
import { Bar as ChartJSBar } from 'react-chartjs-2';
import confetti from 'canvas-confetti';
import Plot from 'react-plotly.js';
import {
  Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LabelList
} from 'recharts';

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartJSTooltip, Legend);

const frases = [
  { "id": 1, "inicio": "O candle de reversão formou exatamente onde ele...", "opcoes": [ { "texto": "previu", "vies": "Viés de Confirmação" }, { "texto": "tinha certeza que ia reverter", "vies": "Otimismo Ilusório" }, { "texto": "hesitou entrar", "vies": "Aversão à Perda" }, { "texto": "não confirmou ontem", "vies": "Viés de Recência" } ] },
  { "id": 2, "inicio": "Mesmo com o preço contra, ele não saiu da operação porque...", "opcoes": [ { "texto": "já tinha perdido muito", "vies": "Aversão à Perda" }, { "texto": "tinha certeza que ia voltar", "vies": "Viés de Confirmação" }, { "texto": "a trend era certa e ele ia surfar ela", "vies": "FOMO" }, { "texto": "ontem foi igual, voltou tudo", "vies": "Viés de Recência" } ] },
  { "id": 3, "inicio": "O mercado rompeu o topo anterior e ele pensou...", "opcoes": [ { "texto": "agora vai!", "vies": "Otimismo Ilusório" }, { "texto": "já vi isso muitas vezes", "vies": "Viés de Retrospectiva" }, { "texto": "não posso ficar de fora", "vies": "FOMO" }, { "texto": "eu sabia", "vies": "Excesso de Confiança" } ] },
  { "id": 4, "inicio": "Mesmo com sinais contrários, ele manteve a operação porque...", "opcoes": [ { "texto": "tinha certeza que estava certo", "vies": "Viés de Confirmação" }, { "texto": "não aceitou realizar o prejuízo", "vies": "Aversão à Perda" }, { "texto": "achava que tinha mais chance de dar certo", "vies": "Otimismo Ilusório" }, { "texto": "fez isso no dia anterior e funcionou", "vies": "Viés de Recência" } ] },
  { "id": 5, "inicio": "Ele decidiu fechar a operação quando...", "opcoes": [ { "texto": "chegou no valor que ele tinha em mente", "vies": "Efeito de Ancoragem" }, { "texto": "lembrou da última vez que o mercado voltou tudo depois de bater no preço", "vies": "Viés de Retrospectiva" }, { "texto": "o pessoal da sala falou que ia sair", "vies": "FOMO" }, { "texto": "o medo de devolver o lucro", "vies": "Aversão à Perda" } ] },
  { "id": 6, "inicio": "Ele fez médio contra porque...", "opcoes": [ { "texto": "na maioria das vezes dá certo e vale o risco", "vies": "Viés de Retrospectiva" }, { "texto": "ignorou a notícia contrária e acreditou no grafista da sala", "vies": "Viés de Confirmação" }, { "texto": "tinha certeza que subiria", "vies": "Excesso de Confiança" }, { "texto": "não aceitava não pegar a reversão", "vies": "FOMO" } ] },
  { "id": 7, "inicio": "Ele moveu o estope contra porque...", "opcoes": [ { "texto": "usou o prejuízo anterior como base", "vies": "Efeito de Ancoragem" }, { "texto": "lembrou do último stop que bateu e voltou", "vies": "Viés de Retrospectiva" }, { "texto": "já estava muito perto e viu que ia bater", "vies": "Aversão à Perda" }, { "texto": "achou que o mercado ia voltar e valia o risco", "vies": "Excesso de Confiança" } ] },
  { "id": 8, "inicio": "Ele teve dúvida na hora de entrar porque...", "opcoes": [ { "texto": "viu a galera do grupo falar que ia ficar de fora", "vies": "FOMO" }, { "texto": "errou as últimas entradas", "vies": "Viés de Recência" }, { "texto": "não queria errar de novo", "vies": "Aversão à Perda" }, { "texto": "achou que precisava de mais notícias", "vies": "Viés de Confirmação" } ] },
  { "id": 9, "inicio": "Após um bom lucro, ele...", "opcoes": [ { "texto": "aumentou a mão confiante", "vies": "Excesso de Confiança" }, { "texto": "entrou de novo para não ficar de fora", "vies": "FOMO" }, { "texto": "evitou operar para não devolver", "vies": "Aversão à Perda" }, { "texto": "repetiu a entrada anterior", "vies": "Viés de Recência" } ] },
  { "id": 10, "inicio": "Ele justificou a entrada dizendo que...", "opcoes": [ { "texto": "foi um padrão igual à última vez que deu certo", "vies": "Viés de Retrospectiva" }, { "texto": "o preço confirmava tudo", "vies": "Viés de Confirmação" }, { "texto": "estava muito otimista", "vies": "Otimismo Ilusório" }, { "texto": "dessa vez não ia ficar de fora", "vies": "FOMO" } ] },
  { "id": 11, "inicio": "Mesmo sem sinais técnicos claros, ele entrou porque...", "opcoes": [ { "texto": "viu uma notícia positiva", "vies": "Viés de Confirmação" }, { "texto": "não queria perder a oportunidade", "vies": "FOMO" }, { "texto": "estava se sentindo sortudo", "vies": "Otimismo Ilusório" }, { "texto": "tinha dado certo antes", "vies": "Viés de Retrospectiva" } ] },
  { "id": 12, "inicio": "Ele hesitou em vender com lucro porque...", "opcoes": [ { "texto": "falou que ia subir mais", "vies": "FOMO" }, { "texto": "não ia deixar dinheiro na mesa nessa tendência favorável", "vies": "Aversão à Perda" }, { "texto": "lembrou da última vez que vendeu cedo demais", "vies": "Viés de Retrospectiva" }, { "texto": "um amigo falou que ele estava certo", "vies": "Viés de Confirmação" } ] },
  { "id": 13, "inicio": "Ele pulou uma entrada boa porque...", "opcoes": [ { "texto": "tinha errado numa parecida ontem", "vies": "Viés de Recência" }, { "texto": "não queria se frustrar de novo", "vies": "Aversão à Perda" }, { "texto": "estava pessimista demais", "vies": "Viés de Confirmação" }, { "texto": "viu o grupo comentando que já passou a entrada", "vies": "FOMO" } ] },
  { "id": 14, "inicio": "Ele operou num horário que normalmente evita porque...", "opcoes": [ { "texto": "o pessoal todo da sala operou", "vies": "FOMO" }, { "texto": "ontem, neste mesmo horário, deu muito bom e fiquei de fora", "vies": "Viés de Recência" }, { "texto": "acreditava que o mercado ia repetir o padrão", "vies": "Viés de Confirmação" }, { "texto": "tinha feito isso na semana passada e funcionou", "vies": "Viés de Retrospectiva" } ] },
  { "id": 15, "inicio": "Mesmo após bater a meta, ele continuou porque...", "opcoes": [ { "texto": "estava se sentindo que o dia era dele", "vies": "Excesso de Confiança" }, { "texto": "achava que ia conseguir dobrar a meta", "vies": "Otimismo Ilusório" }, { "texto": "leu no grupo que o mercado estava muito bom de operar", "vies": "FOMO" }, { "texto": "ainda ia sair um sinal", "vies": "Viés de Confirmação" } ] },
  { "id": 16, "inicio": "Ele decidiu aumentar a mão porque...", "opcoes": [ { "texto": "ontem deu bom", "vies": "Viés de Recência" }, { "texto": "todo mundo opera com mão maior", "vies": "Efeito de Ancoragem" }, { "texto": "estava muito confiante", "vies": "Excesso de Confiança" }, { "texto": "a notícia foi boa na sua visão", "vies": "Viés de Confirmação" } ] },
  { "id": 17, "inicio": "Ele deixou o lucro diminuir bastante porque...", "opcoes": [ { "texto": "achava que ia subir mais", "vies": "Otimismo Ilusório" }, { "texto": "não queria sair errado", "vies": "Aversão à Perda" }, { "texto": "acreditava em outra leitura", "vies": "Viés de Confirmação" }, { "texto": "aconteceu igual no passado", "vies": "Viés de Retrospectiva" } ] },
  { "id": 18, "inicio": "Mesmo após 3 stops seguidos, ele entrou novamente porque...", "opcoes": [ { "texto": "preferia arriscar do que ver subir e perder a trend", "vies": "FOMO" }, { "texto": "sabia que agora ia dar certo", "vies": "Viés de Confirmação" }, { "texto": "o padrão gráfico era clássico", "vies": "Viés de Retrospectiva" }, { "texto": "não queria encerrar no prejuízo", "vies": "Aversão à Perda" } ] },
  { "id": 19, "inicio": "Ele mudou a estratégia no meio do pregão porque...", "opcoes": [ { "texto": "viu outros resultados no grupo", "vies": "FOMO" }, { "texto": "perdeu confiança na anterior", "vies": "Aversão à Perda" }, { "texto": "acreditava em outra leitura", "vies": "Viés de Confirmação" }, { "texto": "achava que deu certo na última vez", "vies": "Viés de Retrospectiva" } ] },
  { "id": 20, "inicio": "Ele ignorou o gerenciamento de risco porque...", "opcoes": [ { "texto": "tinha muita convicção", "vies": "Excesso de Confiança" }, { "texto": "achava que era a melhor chance do dia", "vies": "Otimismo Ilusório" }, { "texto": "viu a sala fazendo a mesma coisa", "vies": "FOMO" }, { "texto": "já tinha feito isso e deu certo", "vies": "Viés de Retrospectiva" } ] },
  { "id": 21, "inicio": "Ele não entrou porque...", "opcoes": [ { "texto": "lembrou do último trade que errou", "vies": "Viés de Retrospectiva" }, { "texto": "ficou com medo", "vies": "Aversão à Perda" }, { "texto": "o candle não ficou perfeito", "vies": "Viés de Confirmação" }, { "texto": "viu alerta no grupo", "vies": "FOMO" } ] },
  { "id": 22, "inicio": "Ele fechou a operação com lucro mínimo porque...", "opcoes": [ { "texto": "não queria perder", "vies": "Aversão à Perda" }, { "texto": "achava que o mercado ia virar", "vies": "Viés de Confirmação" }, { "texto": "o pessoal da sala saiu", "vies": "FOMO" }, { "texto": "já tinha passado por situação parecida antes", "vies": "Viés de Retrospectiva" } ] },
  { "id": 23, "inicio": "Ele alavancou muito mais do que podia...", "opcoes": [ { "texto": "todo mundo alavanca", "vies": "FOMO" }, { "texto": "está tudo sob controle", "vies": "Otimismo Ilusório" }, { "texto": "tenho que recuperar o que perdi", "vies": "Viés de Recência" }, { "texto": "já deu certo algumas vezes", "vies": "Efeito de Ancoragem" } ] },
  { "id": 24, "inicio": "Ele pegou dinheiro dos outros para operar porque...", "opcoes": [ { "texto": "sou um gestor nato", "vies": "Excesso de Confiança" }, { "texto": "muita gente faz isso", "vies": "FOMO" }, { "texto": "sei que é errado, mas vai dar certo", "vies": "Otimismo Ilusório" }, { "texto": "pensou: 'só assim para ficar rico'", "vies": "Efeito de Ancoragem" } ] },
  { "id": 25, "inicio": "Sempre que tem lucro acumulado, ele devolve tudo porque...", "opcoes": [ { "texto": "alavanca, pois sente que agora dominou o mercado", "vies": "Otimismo Ilusório" }, { "texto": "sente frustração porque poderia ter ganho mais", "vies": "FOMO" }, { "texto": "sente que está numa fase ótima e tem que aproveitar a maré", "vies": "Viés de Recência" }, { "texto": "sabia que ia perder", "vies": "Viés de Retrospectiva" } ] }
]
  


export default function App() {
  const [iniciado, setIniciado] = useState(false);
  const [etapa, setEtapa] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [respostas, setRespostas] = useState([]);

  const total = frases.length;
  const fraseAtual = frases[etapa];

  function selecionarResposta(opcao) {
    setRespostaSelecionada(opcao);
  }

  function confirmarResposta() {
    if (!respostaSelecionada) return;
    setRespostas([...respostas, respostaSelecionada]);
    setRespostaSelecionada(null);
    if (etapa + 1 === total) confetti();
    setEtapa(etapa + 1);
  }

  function calcularContagemVieses() {
    const contagem = {};
    respostas.forEach((r) => {
      contagem[r.vies] = (contagem[r.vies] || 0) + 1;
    });
    return contagem;
  }

  function calcularViesMaisFrequente() {
    const contagem = calcularContagemVieses();
    let maisFrequente = null;
    let maiorContagem = 0;
    for (const [vies, count] of Object.entries(contagem)) {
      if (count > maiorContagem) {
        maisFrequente = vies;
        maiorContagem = count;
      }
    }
    return maisFrequente;
  }

  // A tela inicial agora tem o gradiente da classe CSS personalizada
  if (!iniciado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4"> {/* Removido app-background-gradient aqui */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Neurotrading Intensive</h1>
        <p className="text-base sm:text-lg mb-6 text-center">Teste de Leitura Preditiva para Traders</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700 transition duration-300" onClick={() => setIniciado(true)}>
          Começar
        </button>
      </div>
    );
  }

  // A tela de resultados agora tem o gradiente da classe CSS personalizada
  if (etapa >= total) {
    const contagem = calcularContagemVieses();
    const viesMaisFrequente = calcularViesMaisFrequente();
    const data = Object.entries(contagem).map(([vies, valor]) => ({ vies, valor }));
    const cores = [
      '#5e3c99', '#1f78b4', '#33a02c', '#b2df8a', '#a6d854',
      '#8dd3c7', '#fb8072', '#80b1d3', '#fdb462', '#fccde5'
    ];

    return (
      <div className="min-h-screen p-4 sm:p-6 md:p-8 flex flex-col items-center"> {/* Removido app-background-gradient aqui */}
        <div className="bg-white p-6 rounded-xl shadow text-center mb-6 max-w-full sm:max-w-xl">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-green-800">Fim do Teste</h2>
          <p className="text-base sm:text-lg mb-2">Você completou o teste de leitura preditiva.</p>
          <p className="text-base sm:text-lg font-semibold">Viés mais recorrente: <span className="text-green-700">{viesMaisFrequente}</span></p>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-8 max-w-6xl w-full">
          <div className="bg-white p-4 rounded shadow w-full lg:w-1/2 mb-8 lg:mb-0 overflow-x-auto">
            <h3 className="text-xl font-bold mb-2">Resumo das Respostas</h3>
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr>
                  <th className="py-2 px-1 sm:px-2">Frase</th>
                  <th className="py-2 px-1 sm:px-2 whitespace-nowrap">Viés Identificado</th>
                </tr>
              </thead>
              <tbody>
                {respostas.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-1 px-1 sm:px-2">{frases[i].inicio}</td>
                    <td className="py-1 px-1 sm:px-2 font-medium whitespace-nowrap">{r.vies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 rounded shadow w-full lg:w-1/2">
            <h3 className="text-xl font-bold mb-4 text-center">Frequência dos Vieses nas Respostas</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                layout="vertical"
                data={data}
                margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" label={{ value: 'Número de vezes escolhido', position: 'insideBottom', offset: -5 }} />
                <YAxis dataKey="vies" type="category" width={80} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="valor">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                  ))}
                  <LabelList dataKey="valor" position="right" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <footer className="mt-10 text-xs sm:text-sm text-gray-500 text-center px-4">
          © {new Date().getFullYear()} Sincroni Treinamento e Consultoria Ltda — CNPJ 08.847.427/0001-31
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4"> {/* Removido app-background-gradient aqui */}
      <div className="bg-gray-100 p-6 rounded-xl shadow max-w-md sm:max-w-xl w-full">
        <div className="mb-4">
          <div className="text-sm mb-1">Frase {etapa + 1} de {total}</div>
          <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${((etapa + 1) / total) * 100}%` }} />
          </div>
        </div>
        <p className="text-lg sm:text-xl mb-4">{fraseAtual.inicio}</p>
        <div className="space-y-2">
          {fraseAtual.opcoes.map((opcao, index) => (
            <label key={index} className="block text-base sm:text-lg">
              <input type="radio" name="resposta" value={opcao.texto} checked={respostaSelecionada === opcao} onChange={() => selecionarResposta(opcao)} className="mr-2" />
              {opcao.texto}
            </label>
          ))}
        </div>
        <button onClick={confirmarResposta} className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700 transition duration-300" disabled={!respostaSelecionada}>
          Confirmar
        </button>
      </div>
    </div>
  );
}
