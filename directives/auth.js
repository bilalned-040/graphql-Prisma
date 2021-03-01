const {
    SchemaDirectiveVisitor, ApolloError
} = require("apollo-server-express");
const {
    defaultFieldResolver
} = require("graphql");
const {
    PrismaClient
} = require('@prisma/client')
const {
    getUserId
} = require('../utils');
const prisma = new PrismaClient();


class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const {
            resolve = defaultFieldResolver
        } = field;
        field.resolve = async function (...args) {
            // console.log(args)
            const [, , {
                req
            }] = args;
            
            const userId = await getUserId(req);
            const user = await prisma.user.findUnique({ where: { id: userId }});
            if (!user) throw new ApolloError("User not found...");
            
            // saving user in req session
            // console.log(req.user)
            req.user = user;
            // console.log(req.user)

            // next()
            return resolve.apply(this, args);
        };
    }
}

module.exports = AuthDirective;