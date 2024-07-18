//import { tiposPortugol } from "@prisma/client";
import portugolTypes from "./portugolTypes";

export default interface exerciceDTO{
    statement:string,
    name: string,
    creator: string,
    difficulty:number,
    courses: string[]
}