import { getUsersNickNames, getUsersEmails } from './get'
import {registrarUsuario} from './post'
const getFunctions = {
    getUsersNickNames,
    getUsersEmails
}
const postFunctions = {
    registrarUsuario
}
export {
    getFunctions,
    postFunctions
}