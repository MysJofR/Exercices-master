import axios from "axios";
import AppErrorConstructor from "../Errors/errorConstructor";

export default async function getToken(user, pass) {
    try {
    
        const result = await axios.post(`https://moodle.canoas.ifrs.edu.br/login/token.php`, null, {
            params: {
                username: user,
                password: pass,
                service: "moodle_mobile_app"
            }
        })
        if (result.data.error) throw new AppErrorConstructor(result.data.error, result.status);
        if (!result.data.token) throw new AppErrorConstructor("Token not found", result.status);

        return result.data.token;

    } catch (err) {

        if (err instanceof AppErrorConstructor) throw err;
       
       // if(err.response.statusText == "Too Many Requests") throw new AppErrorConstructor("Too Many Requests", 429);
        throw new AppErrorConstructor("Internal Server Error", 500);
    
    }   

}