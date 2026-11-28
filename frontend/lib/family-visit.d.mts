export type VisitSource = { name: string; url: string }
export type VisitCard = { id: string; title: string; notes: string[]; source: VisitSource; extraSource?: VisitSource }
export const visitCards: VisitCard[]
