import path from "path";
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
        servers: [{
            url: process.env.NODE_ENV === 'production'
                ? "https://your-production-url.vercel.app"
                : "http://localhost:4000"
        }],
    },
    apis: [
        path.join(__dirname, './routes/*.swagger.{js,ts}'),
        path.join(__dirname, './components/*.{js,ts}')
    ], // 주석을 포함한 파일 경로
};

console.log("swagger apis path", __dirname);
const specs = swaggerJSDoc(swaggerOptions);


export { specs, swaggerUi };

