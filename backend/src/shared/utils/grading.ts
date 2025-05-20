export type QuestionType = 'mcq' | 'code' | 'text';

export function gradeMCQ(correctAnswer: string, submittedAnswer: string, points: number): number {
  return correctAnswer.trim().toLowerCase() === submittedAnswer.trim().toLowerCase() ? points : 0;
}

export function gradeText(): number {
  // Manual grading required, return 0 for now
  return 0;
}

export function gradeCode(): number {
  // Could later plug in test runners or manual validation
  return 0;
}

export function gradeQuestion(
  questionType: QuestionType,
  correctAnswer: string,
  submittedAnswer: string,
  points: number,
): number {
  switch (questionType) {
    case 'mcq':
      return gradeMCQ(correctAnswer, submittedAnswer, points);
    case 'text':
      return gradeText();
    case 'code':
      return gradeCode();
    default:
      return 0;
  }
}

export function computeTotalScore(results: { score: number }[]): number {
  return results.reduce((acc, r) => acc + (r.score || 0), 0);
}
