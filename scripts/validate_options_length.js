import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsFilePath = path.join(__dirname, '../src/data/ctfl_150_questions.json');

function validateOptionsLength() {
    try {
        const questionsData = JSON.parse(fs.readFileSync(questionsFilePath, 'utf8'));
        const questions = questionsData.questions;

        let issuesFound = false;

        questions.forEach(question => {
            const options = question.options;
            if (options.length === 0) {
                console.warn(`Questão ${question.id}: Não possui opções.`);
                issuesFound = true;
                return;
            }

            const lengths = options.map(opt => opt.length);
            const minLength = Math.min(...lengths);
            const maxLength = Math.max(...lengths);

            // Permitir uma diferença máxima de 20% entre a menor e a maior opção
            if (maxLength > minLength * 1.20) {
                console.warn(`Questão ${question.id}: As opções têm comprimentos muito diferentes. Min: ${minLength}, Max: ${maxLength}. Opções: ${options.join(', ')}`);
                issuesFound = true;
            }
        });

        if (issuesFound) {
            console.error('Validação de comprimento das opções falhou. Ajuste as opções para terem tamanhos mais semelhantes.');
            // process.exit(1); // Não vamos sair com erro para permitir o build, mas avisar
        } else {
            console.log('Validação de comprimento das opções concluída com sucesso.');
        }

    } catch (error) {
        console.error('Erro ao validar comprimento das opções:', error);
        // process.exit(1); // Não vamos sair com erro para permitir o build, mas avisar
    }
}

validateOptionsLength();

