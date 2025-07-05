// App completo com 25 frases, gráfico final de vieses, tabela de resumo, animação de confetes e rodapé de copyright

import { useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import confetti from 'canvas-confetti';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const frases = [
  { id: 1, inicio: "O candle de reversão apareceu exatamente onde ele...", opcoes: [ { texto: "entrou", vies: "Viés de Confirmação" }, { texto: "estava torcendo", vies: "Otimismo Ilusório" }, { texto: "hesitou", vies: "Aversão à Perda" }, { texto: "pulou a entrada de ontem", vies: "Viés de Recência" } ] },
  { id: 2, inicio: "Mesmo com o preço contra, ele não saiu da operação porque...", opcoes: [ { texto: "já tinha perdido muito", vies: "Aversão à Perda" }, { texto: "acreditava que ia voltar", vies: "Viés de Confirmação" }, { texto: "não quis perder a chance", vies: "FOMO" }, { texto: "ontem aconteceu igual e voltou", vies: "Viés de Recência" } ] },
  { id: 3, inicio: "O mercado rompeu o topo anterior e ele pensou...", opcoes: [ { texto: "agora vai disparar!", vies: "Otimismo Ilusório" }, { texto: "já vi isso antes", vies: "Viés de Retrospectiva" }, { texto: "não posso ficar de fora", vies: "FOMO" }, { texto: "eu sabia", vies: "Excesso de Confiança" } ] },
  { id: 4, inicio: "Mesmo com sinais contrários, ele manteve a operação porque...", opcoes: [ { texto: "queria provar que estava certo", vies: "Viés de Confirmação" }, { texto: "já estava no prejuízo", vies: "Aversão à Perda" }, { texto: "achava que tinha mais chance de dar certo", vies: "Otimismo Ilusório" }, { texto: "fez isso no dia anterior e funcionou", vies: "Viés de Recência" } ] },
  { id: 5, inicio: "Ele decidiu encerrar a operação quando...", opcoes: [ { texto: "chegou no valor que ele tinha em mente", vies: "Efeito de Ancoragem" }, { texto: "lembrou da última vez que perdeu tudo", vies: "Viés de Retrospectiva" }, { texto: "a maioria no grupo também saiu", vies: "FOMO" }, { texto: "o medo de entregar o lucro bateu", vies: "Aversão à Perda" } ] },
  { id: 6, inicio: "Ele aumentou a posição porque...", opcoes: [ { texto: "já tinha ido bem antes com isso", vies: "Viés de Retrospectiva" }, { texto: "acreditava ainda mais no trade", vies: "Viés de Confirmação" }, { texto: "tinha certeza que subiria", vies: "Excesso de Confiança" }, { texto: "não queria perder a alta", vies: "FOMO" } ] },
  { id: 7, inicio: "Na hora de montar o stop, ele...", opcoes: [ { texto: "usou o preço anterior como base", vies: "Efeito de Ancoragem" }, { texto: "lembrou do último stop que tomou", vies: "Viés de Retrospectiva" }, { texto: "ajustou para ficar mais confortável", vies: "Aversão à Perda" }, { texto: "deixou sem porque confiava muito", vies: "Excesso de Confiança" } ] },
  { id: 8, inicio: "Ele ficou em dúvida sobre entrar porque...", opcoes: [ { texto: "viu alguém no grupo discordar", vies: "FOMO" }, { texto: "tinha dado errado semana passada", vies: "Viés de Recência" }, { texto: "não queria errar de novo", vies: "Aversão à Perda" }, { texto: "sentiu que estava exagerando", vies: "Viés de Confirmação" } ] },
  { id: 9, inicio: "Após um bom lucro, ele...", opcoes: [ { texto: "aumentou a mão confiante", vies: "Excesso de Confiança" }, { texto: "entrou de novo para não ficar de fora", vies: "FOMO" }, { texto: "evitou operar para não devolver", vies: "Aversão à Perda" }, { texto: "repetiu a entrada anterior", vies: "Viés de Recência" } ] },
  { id: 10, inicio: "Ele justificou a entrada dizendo que...", opcoes: [ { texto: "estava igual à última vez que deu certo", vies: "Viés de Retrospectiva" }, { texto: "o preço confirmava tudo", vies: "Viés de Confirmação" }, { texto: "estava muito otimista", vies: "Otimismo Ilusório" }, { texto: "não queria perder a chance", vies: "FOMO" } ] },
  { id: 11, inicio: "Mesmo sem sinais técnicos claros, ele entrou porque...", opcoes: [ { texto: "viu uma notícia positiva", vies: "Viés de Confirmação" }, { texto: "não queria perder a oportunidade", vies: "FOMO" }, { texto: "estava se sentindo sortudo", vies: "Otimismo Ilusório" }, { texto: "tinha dado certo antes", vies: "Viés de Retrospectiva" } ] },
  { id: 12, inicio: "Ele hesitou em vender porque...", opcoes: [ { texto: "achava que ainda podia subir", vies: "Otimismo Ilusório" }, { texto: "não queria realizar prejuízo", vies: "Aversão à Perda" }, { texto: "lembrou da última vez que vendeu cedo demais", vies: "Viés de Retrospectiva" }, { texto: "tinha convicção na análise", vies: "Viés de Confirmação" } ] },
  { id: 13, inicio: "Ele pulou uma entrada boa porque...", opcoes: [ { texto: "tinha errado numa parecida ontem", vies: "Viés de Recência" }, { texto: "não queria se frustrar de novo", vies: "Aversão à Perda" }, { texto: "estava pessimista demais", vies: "Viés de Confirmação" }, { texto: "viu o grupo comentando que já passou a entrada", vies: "FOMO" } ] },
  { id: 14, inicio: "Ele operou num horário que normalmente evita porque...", opcoes: [ { texto: "viu alguém lucrando", vies: "FOMO" }, { texto: "não queria ficar para trás", vies: "Viés de Recência" }, { texto: "acreditava que o mercado ia repetir o padrão", vies: "Viés de Confirmação" }, { texto: "tinha feito isso na semana passada e funcionou", vies: "Viés de Retrospectiva" } ] },
  { id: 15, inicio: "Mesmo após bater a meta, ele continuou porque...", opcoes: [ { texto: "estava se sentindo invencível", vies: "Excesso de Confiança" }, { texto: "achava que ia conseguir dobrar", vies: "Otimismo Ilusório" }, { texto: "viu o grupo comentando sobre mais oportunidades", vies: "FOMO" }, { texto: "esperava uma confirmação visual", vies: "Viés de Confirmação" } ] },
  { id: 16, inicio: "Ele decidiu aumentar a exposição no ativo porque...", opcoes: [ { texto: "estava indo bem", vies: "Viés de Recência" }, { texto: "lembrou do mês passado", vies: "Viés de Retrospectiva" }, { texto: "estava muito confiante", vies: "Excesso de Confiança" }, { texto: "esperava um sinal claro", vies: "Viés de Confirmação" } ] },
  { id: 17, inicio: "Ele deixou o lucro diminuir bastante porque...", opcoes: [ { texto: "achava que ia subir mais", vies: "Otimismo Ilusório" }, { texto: "não queria sair errado", vies: "Aversão à Perda" }, { texto: "acreditava em outra leitura", vies: "Viés de Confirmação" }, { texto: "aconteceu igual no passado", vies: "Viés de Retrospectiva" } ] },
  { id: 18, inicio: "Mesmo após 3 stops seguidos, ele entrou novamente porque...", opcoes: [ { texto: "estava se sentindo pressionado", vies: "FOMO" }, { texto: "acreditava que agora ia dar certo", vies: "Viés de Confirmação" }, { texto: "o padrão gráfico parecia familiar", vies: "Viés de Retrospectiva" }, { texto: "não queria encerrar no prejuízo", vies: "Aversão à Perda" } ] },
  { id: 19, inicio: "Ele mudou a estratégia no meio do pregão porque...", opcoes: [ { texto: "viu outros resultados no grupo", vies: "FOMO" }, { texto: "perdeu confiança na anterior", vies: "Aversão à Perda" }, { texto: "acreditava em outra leitura", vies: "Viés de Confirmação" }, { texto: "achava que dava certo na última vez", vies: "Viés de Retrospectiva" } ] },
  { id: 20, inicio: "Ele ignorou o gerenciamento de risco porque...", opcoes: [ { texto: "tinha muita convicção", vies: "Excesso de Confiança" }, { texto: "achava que era a melhor chance do dia", vies: "Otimismo Ilusório" }, { texto: "viu outros fazendo o mesmo", vies: "FOMO" }, { texto: "já tinha feito isso antes com sucesso", vies: "Viés de Retrospectiva" } ] },
  { id: 21, inicio: "Ele não fez a entrada planejada porque...", opcoes: [ { texto: "lembrou da última vez que falhou", vies: "Viés de Retrospectiva" }, { texto: "ficou inseguro na hora", vies: "Aversão à Perda" }, { texto: "o candle não ficou perfeito", vies: "Viés de Confirmação" }, { texto: "viu alerta no grupo", vies: "FOMO" } ] },
  { id: 22, inicio: "Ele fechou a operação no 0x0 porque...", opcoes: [ { texto: "não queria perder", vies: "Aversão à Perda" }, { texto: "achava que o mercado ia virar", vies: "Viés de Confirmação" }, { texto: "ouviu alerta no grupo", vies: "FOMO" }, { texto: "já passou por isso antes", vies: "Viés de Retrospectiva" } ] },
  { id: 23, inicio: "Ele abriu várias operações ao mesmo tempo porque...", opcoes: [ { texto: "não queria ficar de fora de nenhuma", vies: "FOMO" }, { texto: "achava que todas iam andar", vies: "Otimismo Ilusório" }, { texto: "queria recuperar o tempo perdido", vies: "Viés de Recência" }, { texto: "já tinha feito isso antes com sucesso", vies: "Viés de Retrospectiva" } ] },
  { id: 24, inicio: "Ele não fez o encerramento planejado porque...", opcoes: [ { texto: "tinha esperança de que fosse mudar", vies: "Viés de Confirmação" }, { texto: "ficou inseguro com a reversão", vies: "Aversão à Perda" }, { texto: "tinha dado certo semana passada", vies: "Viés de Recência" }, { texto: "lembrou do último erro", vies: "Viés de Retrospectiva" } ] },
  { id: 25, inicio: "Ele não seguiu o plano porque...", opcoes: [ { texto: "viu uma chance melhor", vies: "Viés de Confirmação" }, { texto: "lembrou do último erro", vies: "Viés de Retrospectiva" }, { texto: "achou que estava muito óbvio", vies: "Excesso de Confiança" }, { texto: "ficou ansioso para ganhar logo", vies: "FOMO" } ] }
];


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

  if (!iniciado) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Neurotrading Intensive</h1>
        <p className="text-lg mb-6">Treinamento de Leitura Preditiva para Traders</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded text-lg" onClick={() => setIniciado(true)}>
          Começar
        </button>
      </div>
    );
  }

  if (etapa >= total) {
    const contagem = calcularContagemVieses();
    const viesMaisFrequente = calcularViesMaisFrequente();
    const labels = Object.keys(contagem);
    const dados = Object.values(contagem);

    return (
      <div className="min-h-screen bg-green-50 p-8 flex flex-col items-center">
        <div className="bg-white p-6 rounded-xl shadow text-center mb-6">
          <h2 className="text-2xl font-bold mb-4 text-green-800">Fim do Teste</h2>
          <p className="text-lg mb-2">Você completou o treino de leitura preditiva.</p>
          <p className="text-lg font-semibold">Viés mais recorrente: <span className="text-green-700">{viesMaisFrequente}</span></p>
        </div>

        <div className="bg-white p-4 rounded shadow max-w-3xl w-full mb-8">
          <h3 className="text-xl font-bold mb-2">Resumo das Respostas</h3>
          <table className="w-full text-left text-sm">
            <thead><tr><th className="py-2">Frase</th><th className="py-2">Viés Escolhido</th></tr></thead>
            <tbody>
              {respostas.map((r, i) => (
                <tr key={i} className="border-t"><td className="py-1">{frases[i].inicio}</td><td className="py-1 font-medium">{r.vies}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-4 rounded shadow w-full max-w-xl">
          <h3 className="text-xl font-bold mb-4">Distribuição de Vieses</h3>
          <Bar data={{
            labels,
            datasets: [{ label: 'Ocorrências', data: dados, backgroundColor: 'rgba(34, 197, 94, 0.6)' }]
          }} />
        </div>

        <footer className="mt-10 text-sm text-gray-500">© 2025 Sincroni Treinamento e Consultoria Ltda — CNPJ 08.847.427/0001-31</footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-gray-100 p-6 rounded-xl shadow max-w-xl w-full">
        <div className="mb-4">
          <div className="text-sm mb-1">Frase {etapa + 1} de {total}</div>
          <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${((etapa + 1) / total) * 100}%` }} />
          </div>
        </div>
        <p className="text-lg mb-4">{fraseAtual.inicio}</p>
        <div className="space-y-2">
          {fraseAtual.opcoes.map((opcao, index) => (
            <label key={index} className="block">
              <input type="radio" name="resposta" value={opcao.texto} checked={respostaSelecionada === opcao} onChange={() => selecionarResposta(opcao)} className="mr-2" />
              {opcao.texto}
            </label>
          ))}
        </div>
        <button onClick={confirmarResposta} className="bg-green-600 text-white px-4 py-2 rounded mt-4" disabled={!respostaSelecionada}>
          Confirmar
        </button>
      </div>
    </div>
  );
}
