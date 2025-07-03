import { getUsersNickNames, getUsersEmails, getAUser, getPostsFromUser, getCommentsFromUser, getAllPosts, getAllTags } from './get'
import { getUserByObjectId } from './get'
import { getAllUsers } from './get/getAllUsers'
import {registrarUsuario} from './post'
import {validarMail, validarNickName} from './validators'
import {putFunctions} from './put'
import {deleteUser, deletePost, deleteComment} from './delete'
const getFunctions = {
    getUsersNickNames,
    getUsersEmails,
    getAUser,
    getPostsFromUser,
    getCommentsFromUser,
    getAllUsers,
    getUserByObjectId,
    getAllPosts,
    getAllTags
}
const postFunctions = {
    registrarUsuario
}
const validators = {
    validarMail,
    validarNickName
}
const deleteFunctions = {
    deleteUser,
    deletePost,
    deleteComment
}
export {
    getFunctions,
    postFunctions,
    validators,
    putFunctions,
    deleteFunctions
}