export type Lesson = { grade: number; topic: string; prompt: string; hints: string[]; answer: number; explanation: string; choices?: string[]; alternate?: string }
export type StudyVariant = "original" | "practice"
export type StudyState = { grade: number; variant: StudyVariant; level: number; done: boolean; message: string }
export const lessons: Lesson[]
export const practiceLessons: Lesson[]
export function getLesson(grade: number, variant?: StudyVariant): Lesson
export function startStudy(grade?: number, variant?: StudyVariant): StudyState
export function nextStudy(state: StudyState, value: string): StudyState
