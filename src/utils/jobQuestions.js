/**
 * Normalize job Q&A from API (formatted_questions) or legacy description parsing.
 */
export function getJobQuestionsAnswers(job) {
  if (!job) return [];

  if (Array.isArray(job.formatted_questions) && job.formatted_questions.length > 0) {
    return job.formatted_questions.map((item) => ({
      question: item.question,
      answer: item.answer,
    }));
  }

  if (job.questions_answers && typeof job.questions_answers === 'object') {
    return Object.entries(job.questions_answers).map(([id, answer]) => ({
      question: `Question ${id}`,
      answer: Array.isArray(answer) ? answer.join(', ') : String(answer),
    }));
  }

  return [];
}
