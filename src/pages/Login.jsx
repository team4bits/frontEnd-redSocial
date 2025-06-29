import React from 'react'
import FormLogin from '../components/FormLogin'
import {getUsersNickNames} from '../components/functions/get'

const usuarios = await getUsersNickNames();


function Login() {
  console.log(usuarios);
  return (
    <FormLogin usuarios={usuarios}/>
  )
}

export default Login