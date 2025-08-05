import json
import random

def load_questions(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)['questions']

def save_questions(file_path, questions):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump({'questions': questions}, f, ensure_ascii=False, indent=2)

def count_levels(questions):
    counts = {'básico': 0, 'intermediário': 0, 'avançado': 0}
    for q in questions:
        counts[q['level']] += 1
    return counts

def reclassify_questions(questions, target_basic=60, target_intermediate=60, target_advanced=30):
    """
    Reclassifica questões existentes para atingir a distribuição desejada
    """
    basic_questions = [q for q in questions if q['level'] == 'básico']
    intermediate_questions = [q for q in questions if q['level'] == 'intermediário']
    advanced_questions = [q for q in questions if q['level'] == 'avançado']
    
    print(f"Distribuição atual: Básico: {len(basic_questions)}, Intermediário: {len(intermediate_questions)}, Avançado: {len(advanced_questions)}")
    
    # Precisamos de mais questões básicas (60 - 9 = 51)
    # Vamos reclassificar algumas intermediárias e avançadas para básicas
    needed_basic = target_basic - len(basic_questions)
    
    # Reclassificar algumas questões intermediárias para básicas
    if needed_basic > 0 and len(intermediate_questions) > target_intermediate:
        to_reclassify = min(needed_basic, len(intermediate_questions) - target_intermediate)
        for i in range(to_reclassify):
            if intermediate_questions:
                q = intermediate_questions.pop()
                q['level'] = 'básico'
                basic_questions.append(q)
                needed_basic -= 1
    
    # Se ainda precisamos de mais básicas, reclassificar algumas avançadas
    if needed_basic > 0 and len(advanced_questions) > target_advanced:
        to_reclassify = min(needed_basic, len(advanced_questions) - target_advanced)
        for i in range(to_reclassify):
            if advanced_questions:
                q = advanced_questions.pop()
                q['level'] = 'básico'
                basic_questions.append(q)
                needed_basic -= 1
    
    # Ajustar questões intermediárias
    needed_intermediate = target_intermediate - len(intermediate_questions)
    if needed_intermediate > 0 and len(advanced_questions) > target_advanced:
        to_reclassify = min(needed_intermediate, len(advanced_questions) - target_advanced)
        for i in range(to_reclassify):
            if advanced_questions:
                q = advanced_questions.pop()
                q['level'] = 'intermediário'
                intermediate_questions.append(q)
    
    # Remover questões avançadas em excesso
    while len(advanced_questions) > target_advanced:
        advanced_questions.pop()
    
    # Combinar todas as questões
    all_questions = basic_questions + intermediate_questions + advanced_questions
    
    # Embaralhar para distribuir melhor
    random.shuffle(all_questions)
    
    # Reassignar IDs sequenciais
    for i, q in enumerate(all_questions):
        q['id'] = i + 1
    
    return all_questions

if __name__ == '__main__':
    file_path = 'src/data/ctfl_150_questions.json'
    questions = load_questions(file_path)
    
    print(f"Total de questões: {len(questions)}")
    print(f"Distribuição atual: {count_levels(questions)}")
    
    reclassified_questions = reclassify_questions(questions)
    
    print(f"Nova distribuição: {count_levels(reclassified_questions)}")
    print(f"Total de questões após reclassificação: {len(reclassified_questions)}")
    
    save_questions(file_path, reclassified_questions)
    print("Questões reclassificadas e salvas com sucesso!")

