import { getUsersNickNames, getUsersEmails, getAUser, getPostsFromUser, getCommentsFromUser } from './get'
import {registrarUsuario} from './post'
import {validarMail, validarNickName} from './validators'
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
const validators = {
    validarMail,
    validarNickName
}
export {
    getFunctions,
    postFunctions,
    validators
}