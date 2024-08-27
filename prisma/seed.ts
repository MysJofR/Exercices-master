import prisma from "../src/libs/prisma/prisma";

async function createRole(){

const role = await prisma.role.create({
    data: {
        name: "Professor",
        routesAllow: {
            set: ["exercice", 
                "exerciceadd",
                "exercicedelete",
                "exercicelist",
                "exercicesubmit",
                "exerciceupdate",
                "me"
            ]
        }
    }
})
console

}
createRole()