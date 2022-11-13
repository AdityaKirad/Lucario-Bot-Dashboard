import {PrismaClient} from '@prisma/client';

declare global {
    var Prisma: PrismaClient | undefined
}