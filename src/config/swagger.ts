export const swaggerOps = {
    exposeRoute: true,
    routePrefix: "/swagger",
    swagger: {
        info: {
            title: "Fastify swagger",
            description: "Fastify swagger API",
            version: "0.1.0",
        },
        schemes: ["http"],
    },
}
