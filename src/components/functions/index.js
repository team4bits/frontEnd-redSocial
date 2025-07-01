import { getUsersNickNames, getUsersEmails, getUserByObjectId } from './get'
import { getAllUsers } from './get/getAllUsers'
import {registrarUsuario} from './post'
import {validarMail, validarNickName} from './validators'
const getFunctions = {
    getUsersNickNames,
    getUsersEmails,
    getAllUsers,
    getUserByObjectId
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