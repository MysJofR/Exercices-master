import fs from "fs";
import path from "path";
import request from "request";
import AppErrorConstructor from "../Errors/errorConstructor";

function isNull(obj: any): obj is null {
    return typeof obj == "undefined";
}
function isJson(item) {
    let value = typeof item !== "string" ? JSON.stringify(item) : item;    
    try {
      value = JSON.parse(value);
    } catch (e) {
      return false;
    }
      
    return typeof value === "object" && value !== null;
  }

  function isJSON(str) {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}

export default async function saveImageToDb(
    token: string,
    fileurl: string,
    username: string,
    id: string
) {
    // https://moodle.canoas.ifrs.edu.br/pluginfile.php/176866/user/icon/boost/f1?rev=2918238
    const url = fileurl.match(/pluginfile\.php\/(\d+)/);
    // I need to add webservice/pluginfile.php to the url
    if (isNull(url)) throw new AppErrorConstructor("URL is not valid", 400);
    if (isNull(url[1])) throw new AppErrorConstructor("URL is not valid", 400);

    try {
        let urlToReq = `https://moodle.canoas.ifrs.edu.br/webservice/pluginfile.php/${url[1]}/user/icon/f1?token=${token}`
        let fileName = getStartLetters(username)+"-"+id

        if(process.env.IMAGE_STORAGE_PATH){
            await new Promise((resolve,reject) => {
                
            request(urlToReq, {encoding: 'binary'}, function(error, response, body) {
                if(isJSON(body)){
                    reject(new AppErrorConstructor("Token Error",500))
                }
                try {
                    fs.writeFileSync(path.join(process.env.IMAGE_STORAGE_PATH as string,fileName+".jpg"),body,'binary')
                } catch (error) {
                    reject(new AppErrorConstructor("Internal app error",500))
                }
                

                resolve(true)
            });

            })
        } else {
            throw new AppErrorConstructor(
                "Error while trying to get the image misconfigured server",
                500
            );
        }
        return path.join(process.env.IMAGE_STORAGE_PATH as string,fileName+".jpg")

    }catch (err) {
        console.log(err);
        if (err instanceof AppErrorConstructor) throw err;
        throw new AppErrorConstructor(
            "Error while trying to get the image",
            500
        );
    }
}

function getStartLetters(fullname: string): string {
    let initLetters: string[] = [];
    fullname.split(" ").forEach((name) => {
        initLetters.push(name[0]);
    });
    return initLetters.join("");
}
