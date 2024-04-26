import { parse } from 'path'; 

import pather from 'path' 

 

export default function returnUsablePathFromPicture(path: string) { 

 

const fileName = parse(path).name 

 

const processor = '/storage/images' 

return `${processor}/${fileName}.jpg`  

 

} 