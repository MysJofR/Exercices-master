import axios from 'axios';
import AppErrorConstructor from '../Errors/errorConstructor';
export default async function getYearAndCourse(token:string,id:number) {
    
        const usersCourse = await axios.request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://moodle.canoas.ifrs.edu.br/webservice/rest/server.php?wstoken=${token}&wsfunction=core_enrol_get_users_courses&moodlewsrestformat=json&userid=${id}`,
        headers: { }
      })  

      
      if(!usersCourse.data) throw new AppErrorConstructor("Error",500)
      if(usersCourse.data.exception) throw new AppErrorConstructor(usersCourse.data.message,500)
      
      if(typeof usersCourse.data as any != "object") throw new AppErrorConstructor("Error",500)
      if(usersCourse.data.length === 0) throw new AppErrorConstructor("User not found",404)

        let year:string = ""
        let courseName:string = ""

      const courses = usersCourse.data
      
      courses.forEach(course => {

        const name = course.displayname
       
        if(name.match(/\[(\d{4})\.([^\]]+)\] (.+)/) && year === "" && courseName === ""){

            year = name.match(/\[(\d{4})\.([^\]]+)\] (.+)/)[1]
            courseName = name.match(/\[(\d{4})\.([^\]]+)\] (.+)/)[2]
            
        }
        
      })
      ;
      if(year === "" && courseName === "") throw new AppErrorConstructor("Course not found",404)
        return {year,courseName}
      //console.log(year,courseName)

    }