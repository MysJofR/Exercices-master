import axios from "axios";
import AppErrorConstructor from "../Errors/errorConstructor";

export default async function getInfoFromUser(token: string, username: string) {

    const result = await axios.get(`https://moodle.canoas.ifrs.edu.br/webservice/rest/server.php`, {
        params: {
            wstoken: token,
            wsfunction: "core_user_get_users_by_field",
            moodlewsrestformat: "json",
            field: "username",
            values: [
                username
            ]
        }
    })

   
    if(result.data.length === 0) throw new AppErrorConstructor("User not found",404)
    if(result.data.exception) throw new AppErrorConstructor(result.data.message,500)
    return result.data[0]

}