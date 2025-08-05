
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

def generate_new_question(level, lo_prefix):
    # This is a placeholder. Real question generation would be more complex.
    # For now, I'll create generic questions based on level and LO.
    question_id = random.randint(1000, 9999) # Placeholder for unique ID
    return {
        "id": question_id,
        "question": f"Nova questão {level} sobre {lo_prefix}?",
        "options": [
            "A) Opção 1",
            "B) Opção 2",
            "C) Opção 3",
            "D) Opção 4"
        ],
        "correctAnswer": 0,
        "level": level,
        "LO": lo_prefix,
        "correctFeedback": f"Feedback correto para questão {level} {lo_prefix}.",
        "incorrectFeedback": f"Feedback incorreto para questão {level} {lo_prefix}."
    }

def adjust_distribution(questions, target_basic, target_intermediate, target_advanced):
    basic_questions = [q for q in questions if q['level'] == 'básico']
    intermediate_questions = [q for q in questions if q['level'] == 'intermediário']
    advanced_questions = [q for q in questions if q['level'] == 'avançado']

    # Adjust basic questions
    while len(basic_questions) < target_basic:
        # Placeholder LOs. In a real scenario, these would be derived from syllabus.
        basic_questions.append(generate_new_question('básico', 'FL-X.X.X'))
    while len(basic_questions) > target_basic:
        # Try to reclassify advanced to basic if possible, or remove
        if advanced_questions and len(basic_questions) < target_basic:
            q = advanced_questions.pop(0)
            q['level'] = 'básico'
            basic_questions.append(q)
        else:
            basic_questions.pop(0) # Remove if cannot reclassify

    # Adjust intermediate questions
    while len(intermediate_questions) < target_intermediate:
        intermediate_questions.append(generate_new_question('intermediário', 'FL-Y.Y.Y'))
    while len(intermediate_questions) > target_intermediate:
        # Try to reclassify advanced to intermediate if possible, or remove
        if advanced_questions and len(intermediate_questions) < target_intermediate:
            q = advanced_questions.pop(0)
            q['level'] = 'intermediário'
            intermediate_questions.append(q)
        else:
            intermediate_questions.pop(0) # Remove if cannot reclassify

    # Adjust advanced questions
    while len(advanced_questions) > target_advanced:
        advanced_questions.pop(0) # Remove excess advanced questions
    while len(advanced_questions) < target_advanced:
        advanced_questions.append(generate_new_question('avançado', 'FL-Z.Z.Z'))

    all_questions = basic_questions + intermediate_questions + advanced_questions
    # Reassign IDs to ensure uniqueness and sequential order if desired
    for i, q in enumerate(all_questions):
        q['id'] = i + 1
    
    return all_questions

if __name__ == '__main__':
    file_path = 'src/data/ctfl_150_questions.json'
    questions = load_questions(file_path)
    
    print(f"Current distribution: {count_levels(questions)}")

    target_basic = 60
    target_intermediate = 60
    target_advanced = 30

    adjusted_questions = adjust_distribution(questions, target_basic, target_intermediate, target_advanced)
    save_questions(file_path, adjusted_questions)
    
    print(f"New distribution: {count_levels(adjusted_questions)}")



