import { getUsersNickNames, getUsersEmails } from './get'
import {registrarUsuario} from './post'
import {validarMail, validarNickName} from './validators'
const getFunctions = {
    getUsersNickNames,
    getUsersEmails
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