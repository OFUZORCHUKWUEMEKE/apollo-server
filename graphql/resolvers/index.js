const postsResolvers = require('./posts')
const usersResolvers = require('./users')
const coomentResolvers = require('./comments')

module.exports={
    Query:{
        ...postsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...coomentResolvers.Mutation
        
    }
}