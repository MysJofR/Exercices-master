import { parse } from 'path';

export default function returnUsablePathFromPicture(path: string) {

const fileName = parse(path).name
return `${process.env.APP_URL}/${fileName}` 

}