import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para converter o formato antigo para o novo
function convertQuestion(oldQuestion) {
  return {
    id: oldQuestion.id || Math.random().toString(36).substr(2, 9),
    question: oldQuestion.pergunta,
    options: oldQuestion.opcoes,
    correctAnswer: oldQuestion.opcoes[parseInt(oldQuestion.indice_correto)],
    explanation: oldQuestion.explicacao
  };
}

// Função para processar o arquivo
function convertAutomationQuestions() {
  try {
    console.log('🔄 Convertendo questões do Mestre da Automação...');

    // Ler o arquivo de origem
    const sourcePath = path.join(__dirname, '../src/data/quiz-automacao_doc.json');
    const sourceData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

    // Converter as questões
    const convertedQuestions = sourceData.questions.map(convertQuestion);

    // Criar o novo formato
    const newFormat = {
      questions: convertedQuestions
    };

    // Salvar o arquivo convertido
    const targetPath = path.join(__dirname, '../src/data/quiz-automacao.json');
    fs.writeFileSync(targetPath, JSON.stringify(newFormat, null, 2), 'utf8');

    console.log(`✅ Conversão concluída! ${convertedQuestions.length} questões convertidas.`);
    console.log(`📁 Arquivo salvo em: ${targetPath}`);

    return convertedQuestions.length;
  } catch (error) {
    console.error('❌ Erro na conversão:', error);
    return 0;
  }
}

// Executar conversão
convertAutomationQuestions();

export { convertQuestion, convertAutomationQuestions };
