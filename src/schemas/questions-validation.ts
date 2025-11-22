import type { CertificateAnswer, CertificateQuestion } from '@/services/certificates/types';
import type { ShieldAnswers, ShieldQuestion } from '@/services/shield';
import type { Id } from './types';

export function validateCertificateAnswers(
  questionsData: CertificateQuestion[],
  answers: CertificateAnswer[]
): { isValid: boolean; error: string | null } {
  // Create a map of answers by question_id for quick lookup
  const answerMap = new Map<Id, CertificateAnswer>();
  answers.forEach((answer) => {
    answerMap.set(answer.question_id, answer);
  });

  // Validate each question
  for (const question of questionsData) {
    const answer = answerMap.get(question.id);

    // Check if question is answered
    if (!answer) {
      return {
        isValid: false,
        error: 'يرجى التأكد من تعبئة جميع البيانات المطلوبة'
      };
    }

    // Check if answer is not empty
    if (!answer.answer || answer.answer.trim() === '') {
      return {
        isValid: false,
        error: 'يرجى التأكد من تعبئة جميع البيانات المطلوبة'
      };
    }

    // Check if attachment is required and provided
    if (question.attachment_required && !answer.attachment) {
      return {
        isValid: false,
        error: 'يرجى التأكد من تعبئة جميع البيانات المطلوبة'
      };
    }
  }

  return {
    isValid: true,
    error: null
  };
}

export function validateShieldAnswers(
  axisQuestions: ShieldQuestion[],
  answers: ShieldAnswers
): { isValid: boolean; error: string | null } {
  // Check if all questions are answered
  for (const question of axisQuestions) {
    const answer = answers.questions.find((a) => a.question_id === question.id);

    if (!answer || answer.answer === null || answer.answer === undefined) {
      return {
        isValid: false,
        error: 'يرجى التأكد من تعبئة جميع البيانات المطلوبة'
      };
    }
  }

  // Check if 3 attachments are provided
  const validAttachments = answers.attachments.filter((att) => att && att.trim() !== '');
  if (validAttachments.length !== 3) {
    return {
      isValid: false,
      error: 'يرجى التأكد من تعبئة جميع البيانات المطلوبة'
    };
  }

  return {
    isValid: true,
    error: null
  };
}
