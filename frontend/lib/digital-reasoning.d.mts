export interface ReasoningExercise {title:string;question:string;options:string[];correctIndex:number;explanation:string}
export function getReasoningExercise(grade:number):ReasoningExercise|null;
