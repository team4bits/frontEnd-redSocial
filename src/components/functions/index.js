import { getUsersNickNames, getUsersEmails, getUserByObjectId } from './get'
import { getAllUsers } from './get/getAllUsers'
import {registrarUsuario} from './post'
import {validarMail, validarNickName} from './validators'
import {putFunctions} from './put'
import {deleteUser} from './delete'
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
const deleteFunctions = {
    deleteUser
}
export {
    getFunctions,
    postFunctions,
    validators,
    putFunctions,
    deleteFunctions
}