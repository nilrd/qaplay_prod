import json
import re

def extract_syllabus_los(pdf_text):
    los = []
    # Regex para capturar o LO (ex: FL-1.1.1) e o título/descrição associado
    # Ajustado para ser mais flexível com a formatação do título/descrição
    lo_pattern = re.compile(r'^(FL-\d+\.\d+\.\d+)\s+(.+?)(?=\nFL-\d+\.\d+\.\d+|\n\d+\s+[A-Z][a-z]+|\n\s*\Z)', re.DOTALL | re.MULTILINE)

    matches = lo_pattern.finditer(pdf_text)
    for match in matches:
        lo_id = match.group(1).strip()
        description = match.group(2).strip()
        los.append({"id": lo_id, "description": description})
    return los

def extract_sample_questions(pdf_text):
    questions = []
    # Regex para capturar Questão #N (X Ponto) ou Questão #AN (X Ponto)
    # e todo o seu conteúdo até a próxima questão ou o final do documento
    question_pattern = re.compile(
        r'Questão\s+#(A?\d+)\s+\((\d+)\s+Ponto\)\s*\n'  # Question ID and points
        r'(.+?)\n'  # The question text itself
        r'\s*A\)\s*(.+?)\n'  # Option A
        r'\s*B\)\s*(.+?)\n'  # Option B
        r'\s*C\)\s*(.+?)\n'  # Option C
        r'\s*D\)\s*(.+?)\n'  # Option D
        r'(?:\s*Justificativa:\s*(.+?)\n)?' # Optional Justification
        r'(?:\s*LO:\s*(.+?)\n)?' # Optional LO
        r'(?:\s*Resposta Correta:\s*([A-D]))?', # Optional Correct Answer
        re.DOTALL
    )

    matches = question_pattern.finditer(pdf_text)
    for match in matches:
        q_id = match.group(1)
        points = int(match.group(2))
        question_text = match.group(3).strip()
        options = [
            match.group(4).strip(),
            match.group(5).strip(),
            match.group(6).strip(),
            match.group(7).strip()
        ]
        justification = match.group(8).strip() if match.group(8) else ""
        lo = match.group(9).strip() if match.group(9) else ""
        correct_answer_letter = match.group(10).strip() if match.group(10) else ""

        correct_answer_index = -1
        if correct_answer_letter:
            correct_answer_index = ord(correct_answer_letter) - ord('A')

        questions.append({
            "id": q_id,
            "question": question_text,
            "options": options,
            "correctAnswer": correct_answer_index,
            "justification": justification,
            "LO": lo,
            "points": points
        })
    return questions

# Placeholder for reading PDF content
# In the actual execution, I will pass the content of the PDFs to these functions.

# Example usage (for testing the functions):
# syllabus_content = """FL-1.1.1 O que é teste? Teste é o processo de...\nFL-1.1.2 Objetivos do teste. Os objetivos são..."""
# los = extract_syllabus_los(syllabus_content)
# print(json.dumps(los, indent=2, ensure_ascii=False))

# sample_exam_content = """Questão #1 (1 Ponto)\nQual é o foco do teste de resiliência?\nA) Facilidade de uso pelo usuário final\nB) Resistência a falhas e condições adversas\nC) Desempenho sob alta demanda\nD) Segurança contra vulnerabilidades\nJustificativa: Teste de resiliência verifica...\nLO: FL-4.6.25\nResposta Correta: B"""
# questions = extract_sample_questions(sample_exam_content)
# print(json.dumps(questions, indent=2, ensure_ascii=False))


