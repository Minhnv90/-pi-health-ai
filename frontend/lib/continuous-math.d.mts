export type MathExercise = { topic: string; prompt: string; hints: [string, string]; answer: number; explanation: string };
export function createMathExercise(grade: number, index: number): MathExercise | null;
