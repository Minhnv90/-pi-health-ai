export type FutureTechLesson={title:string;body:string;question:string;answer:string;source:{label:string;url:string}|null};
export function getFutureTechLesson(grade:number):FutureTechLesson|null;
