import { getUsersNickNames, getUsersEmails, getAUser, getPostsFromUser, getCommentsFromUser } from './get'
import {registrarUsuario} from './post'
const getFunctions = {
    getUsersNickNames,
    getUsersEmails,
    getAUser,
    getPostsFromUser,
    getCommentsFromUser
}
const postFunctions = {
    registrarUsuario
}
export {
    getFunctions,
    postFunctions
}