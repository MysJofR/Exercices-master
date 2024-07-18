import axios from "axios";
import AppErrorConstructor from "../Errors/errorConstructor";

export default async function getUserCoursesAndRoles(token, userId) {
    try {
        // Obtenha os cursos nos quais o usuário está inscrito
        const coursesResponse = await axios.get('https://moodle.canoas.ifrs.edu.br/webservice/rest/server.php', {
            params: {
                wstoken: token,
                wsfunction: "core_enrol_get_users_courses",
                moodlewsrestformat: "json",
                userid: userId
            }
        });

        const courses = coursesResponse.data;
        if (courses.length === 0) throw new AppErrorConstructor("User not found", 404);

        // Inicialize uma lista para armazenar os papéis do usuário em cada curso
        const userRoles = [];

        // Para cada curso, obtenha os usuários inscritos e verifique o papel do usuário
        for (const course of courses) {
            const enrolledUsersResponse = await axios.get('https://moodle.canoas.ifrs.edu.br/webservice/rest/server.php', {
                params: {
                    wstoken: token,
                    wsfunction: "core_enrol_get_enrolled_users",
                    moodlewsrestformat: "json",
                    courseid: course.id
                }
            });

            const enrolledUsers = enrolledUsersResponse.data;
            const user = enrolledUsers.find(u => u.id == userId);

            if (user) {
                userRoles.push({
                    course: course.fullname,
                    roles: user.roles.map(role => role.shortname)
                });
            }
        }






    

       
        return userRoles;
    } catch (error) {
        // Adiciona tratamento de erro para solicitações de rede
        if (error.response) {
            throw new AppErrorConstructor(`API Error: ${error.response.data.message}`, error.response.status);
        } else if (error.request) {
            throw new AppErrorConstructor("Network error: No response received", 500);
        } else {
            throw new AppErrorConstructor(`Error: ${error.message}`, 500);
        }
    }
}