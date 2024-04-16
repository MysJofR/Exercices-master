import { modules } from "@prisma/client";
import { isIdescNarrativa } from "../interfaces/courses/IdescNarrativa";


export default function returnTypeGuardFromCourse(course:modules){
    
    switch (course) {
        case "descNarrativa":
            return isIdescNarrativa;
            break;
    }

}