//import { tiposPortugol } from "@prisma/client";
import portugolTypes from "./portugolTypes";

export default interface exerciceDTO{
    statement:string,
    name: string,
    difficulty:number,
}