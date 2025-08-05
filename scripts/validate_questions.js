import Ajv from "ajv";
import addFormats from "ajv-formats";
import fs from "fs";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = JSON.parse(fs.readFileSync("./src/data/ctfl_150_questions_schema.json", "utf8"));
const validate = ajv.compile(schema);

const questionsData = JSON.parse(fs.readFileSync("./src/data/ctfl_150_questions.json", "utf8"));

const isValid = validate(questionsData);

if (!isValid) {
  console.error("Erro de validação das questões:");
  console.error(validate.errors);
  process.exit(1);
} else {
  console.log("Validação das questões CTFL 4.0 bem-sucedida!");
}

const summary = JSON.parse(fs.readFileSync("./src/data/ctfl_150_questions_summary.json", "utf8"));

const totalQuestions = questionsData.questions.length;
const basicCount = questionsData.questions.filter(q => q.level === 'básico').length;
const intermediateCount = questionsData.questions.filter(q => q.level === 'intermediário').length;
const advancedCount = questionsData.questions.filter(q => q.level === 'avançado').length;

if (totalQuestions !== summary.total_questions) {
  console.error(`Erro: Total de questões (${totalQuestions}) não corresponde ao resumo (${summary.total_questions}).`);
  process.exit(1);
}

if (basicCount !== summary.level_distribution.básico ||
    intermediateCount !== summary.level_distribution.intermediário ||
    advancedCount !== summary.level_distribution.avançado) {
  console.error("Erro: Distribuição de níveis não corresponde ao resumo.");
  console.error(`Esperado: Básico ${summary.level_distribution.básico}, Intermediário ${summary.level_distribution.intermediário}, Avançado ${summary.level_distribution.avançado}`);
  console.error(`Encontrado: Básico ${basicCount}, Intermediário ${intermediateCount}, Avançado ${advancedCount}`);
  process.exit(1);
}

console.log("Verificação de distribuição de níveis bem-sucedida!");

// Validação de comprimento das alternativas
questionsData.questions.forEach((question, qIndex) => {
  const correctOption = question.options[question.correctAnswer];
  const correctLength = correctOption.length;

  question.options.forEach((option, oIndex) => {
    if (oIndex !== question.correctAnswer) {
      const diff = Math.abs(correctLength - option.length);
      const maxAllowedDiff = correctLength * 0.20; // 20% de diferença

      if (diff > maxAllowedDiff) {
        console.warn(`Aviso: Questão ${question.id}, Opção ${String.fromCharCode(65 + oIndex)} ("${option}") tem diferença de comprimento significativa em relação à resposta correta ("${correctOption}"). Diferença: ${diff}, Máximo permitido: ${maxAllowedDiff.toFixed(2)}`);
      }
    }
  });
});

console.log("Verificação de comprimento das alternativas concluída. (Avisos acima, se houver)");


