export default interface exerciceUpdateDTO {
    id: string,
    name?: string,
    statement?: string,
    difficulty?: number,
    tests?: {
        input: string[],
        output: string
    }[]
    doneBy?: string[] | null,
    courses? : string[]
   
}