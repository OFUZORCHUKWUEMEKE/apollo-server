const Post = require('../../models/Post')
const checkAUth = require('../../utils/checkAuth')
const {AuthenticationError} = require('apollo-server')
module.exports ={
    Query:{
        getPosts :async()=>{
            try {
                const posts = await Post.find().sort({createdAt:-1})
                return posts
            } catch (error) {
                throw new Error(error) 
            }
        },
        getPost:async(_,{postId})=>{
            try {
                const post = Post.find(postId)
                if(post){
                    return post
                }else{
                    throw new Error('Post not Found')
                }
            } catch (error) {
                    throw new Error(error)
            }
        }
    },
    Mutation:{
        createPost :async(_,{body},context)=>{
           const user = checkAUth(context)

           console.log(user)
           const newPost = new Post({
            body,
            user:user.id,
            username:user.username,
            createdAt:new Date().toISOString()
           })
           const post = await newPost.save()

           return post
        },
        deletePost:async(_,{postId},context)=>{
            const user = checkAUth(context)
            try {
                const post = await Post.findById(postId)
                if(user.username===post.username){
                    console.log(post.username)
                    await post.delete()
                    return 'Post deleted Successfully'
                }else{
                    throw new AuthenticationError('Action not allowed')
                }
            } catch (error) {
                throw new Error(error)
            }
           
        }
    }
}