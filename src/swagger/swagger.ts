import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger 옵션 설정
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Luce Vita API",
            version: "1.0.0",
            description: "My API documentation",
        },
    },
    servers: ["http://localhost:4000"],
    apis: ["./src/swagger/routes/*.swagger.ts",
        "./src/swagger/components/*.ts"], // 주석을 포함한 파일 경로
};

const specs = swaggerJSDoc(swaggerOptions);


export { specs, swaggerUi };
