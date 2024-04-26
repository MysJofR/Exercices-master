import expressConfig from "./config/expressConfig";

expressConfig().listen(3000, () => {
    console.log("Server running on port http://localhost:3000");
})