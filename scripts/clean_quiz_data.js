import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para limpar marcadores das opções
function cleanOptions(options) {
  return options.map(option => {
    // Remove marcadores como "A) ", "B) ", "C) ", "D) " do início
    return option.replace(/^[A-D]\)\s*/, '').trim();
  });
}

// Função para limpar o campo correctAnswer
function cleanCorrectAnswer(correctAnswer) {
  if (typeof correctAnswer === 'string') {
    // Remove marcadores como "A) ", "B) ", "C) ", "D) " do início
    return correctAnswer.replace(/^[A-D]\)\s*/, '').trim();
  }
  return correctAnswer;
}

// Função para processar um arquivo de quiz
function cleanQuizFile(filePath) {
  try {
    console.log(`Processando arquivo: ${filePath}`);
    
    // Ler o arquivo
    const data = fs.readFileSync(filePath, 'utf8');
    const quizData = JSON.parse(data);
    
    // Limpar as opções e correctAnswer de cada pergunta
    let cleanedCount = 0;
    quizData.questions.forEach(question => {
      let hasChanges = false;
      
      // Limpar opções
      if (question.options && Array.isArray(question.options)) {
        const originalOptions = [...question.options];
        question.options = cleanOptions(question.options);
        
        // Verificar se houve mudanças nas opções
        const optionsChanged = originalOptions.some((option, index) => 
          option !== question.options[index]
        );
        
        if (optionsChanged) {
          hasChanges = true;
        }
      }
      
      // Limpar correctAnswer
      if (question.correctAnswer) {
        const originalCorrectAnswer = question.correctAnswer;
        question.correctAnswer = cleanCorrectAnswer(question.correctAnswer);
        
        if (originalCorrectAnswer !== question.correctAnswer) {
          hasChanges = true;
        }
      }
      
      if (hasChanges) {
        cleanedCount++;
      }
    });
    
    // Salvar o arquivo limpo
    fs.writeFileSync(filePath, JSON.stringify(quizData, null, 2), 'utf8');
    
    console.log(`✅ Arquivo limpo: ${cleanedCount} questões processadas`);
    return cleanedCount;
    
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return 0;
  }
}

// Função principal
function main() {
  const dataDir = path.join(__dirname, '..', 'src', 'data');
  const quizFiles = [
    'quiz-ctfl.json',
    'quiz-automacao.json'
  ];
  
  let totalCleaned = 0;
  
  console.log('🧹 Iniciando limpeza dos dados do quiz...\n');
  
  quizFiles.forEach(fileName => {
    const filePath = path.join(dataDir, fileName);
    
    if (fs.existsSync(filePath)) {
      const cleaned = cleanQuizFile(filePath);
      totalCleaned += cleaned;
    } else {
      console.log(`⚠️  Arquivo não encontrado: ${fileName}`);
    }
  });
  
  console.log(`\n🎉 Limpeza concluída! Total de questões processadas: ${totalCleaned}`);
}

// Executar se chamado diretamente
main();

export { cleanOptions, cleanCorrectAnswer, cleanQuizFile };
