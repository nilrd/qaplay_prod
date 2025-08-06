import json
import random

def generate_question(knowledge_base, difficulty):
    # Filter concepts by difficulty level
    available_concepts = []
    for chapter in knowledge_base["syllabus"]["chapters"]:
        for section in chapter["sections"]:
            for concept in section["concepts"]:
                if concept["level"] == difficulty:
                    available_concepts.append(concept)

    if not available_concepts:
        return None # No concepts found for this difficulty

    # Select a random concept
    selected_concept = random.choice(available_concepts)

    # Generate question based on the concept's description
    question_text = f"De acordo com o ISTQB CTFL 4.0, qual é a definição ou principal característica de '{selected_concept['title']}'?"

    # Generate correct answer
    correct_answer = selected_concept["description"]

    # Generate incorrect answers (distractors)
    # This is a simplified approach. A more advanced version would use NLP to create plausible distractors.
    # For now, it picks other concepts' descriptions as distractors.
    distractors = []
    while len(distractors) < 3:
        random_concept = random.choice(available_concepts)
        if random_concept != selected_concept and random_concept["description"] not in distractors:
            distractors.append(random_concept["description"])

    # Combine correct and incorrect answers
    options = [correct_answer] + distractors
    random.shuffle(options)

    # Find the index of the correct answer after shuffling
    correct_answer_index = options.index(correct_answer)

    # Generate feedback
    correct_feedback = f"Correto! {selected_concept['description']} (LO: {selected_concept['id']})."
    incorrect_feedback = f"Incorreto. A resposta correta é: {correct_answer}. {selected_concept['description']} (LO: {selected_concept['id']})."

    return {
        "question": question_text,
        "options": options,
        "correctAnswer": correct_answer_index,
        "correctFeedback": correct_feedback,
        "incorrectFeedback": incorrect_feedback,
        "LO": selected_concept["id"],
        "level": selected_concept["level"]
    }

# Example usage (for testing the function):
# with open("/home/ubuntu/qaplay_prod/src/data/knowledge_base.json", "r", encoding="utf-8") as f:
#     kb = json.load(f)

# for _ in range(5):
#     q = generate_question(kb, "junior")
#     if q:
#         print(json.dumps(q, indent=2, ensure_ascii=False))
#     else:
#         print("No question generated.")




if __name__ == "__main__":
    with open("/home/ubuntu/qaplay_prod/src/data/knowledge_base.json", "r", encoding="utf-8") as f:
        kb = json.load(f)

    # Test for junior level
    print("\n--- Junior Level Question ---")
    q_junior = generate_question(kb, "junior")
    if q_junior:
        print(json.dumps(q_junior, indent=2, ensure_ascii=False))
    else:
        print("No junior question generated.")

    # Test for pleno level
    print("\n--- Pleno Level Question ---")
    q_pleno = generate_question(kb, "pleno")
    if q_pleno:
        print(json.dumps(q_pleno, indent=2, ensure_ascii=False))
    else:
        print("No pleno question generated.")

    # Test for senior level
    print("\n--- Senior Level Question ---")
    q_senior = generate_question(kb, "senior")
    if q_senior:
        print(json.dumps(q_senior, indent=2, ensure_ascii=False))
    else:
        print("No senior question generated.")


