"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
});
prisma.$on('query', (e) => {
    console.log('-------------------------------------------');
    console.log('Query: ' + e.query);
    console.log('-------------------------------------------');
    console.log('Params: ' + e.params);
    console.log('-------------------------------------------');
    console.log('Duration: ' + e.duration + 'ms');
    console.log('-------------------------------------------');
});
// Listen for any warning events emitted by Prisma
// prisma.$on('warn', (e) => {
//     console.log(e)
// })
// Listen for any informational events emitted by Prisma
// prisma.$on('info', (e) => {
//     console.log(e)
// })
// Listen for any error events emitted by Prisma
// prisma.$on('error', (e) => {
//     console.log(e)
// })
exports.default = prisma;
