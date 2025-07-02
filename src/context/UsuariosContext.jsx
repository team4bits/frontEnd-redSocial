import {createContext, useState, useEffect} from "react";
import { getAllUsers} from '../components/functions/get/getAllUsers'

export const UsuariosContext = createContext();

export const UsuariosProvider = ({ children }) => {
    const [usuarios, setUsuarios] = useState([]);

    //Al iniciar la app, intenta cargar todos los usuarios
    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const usuariosObtenidos = await getAllUsers();
                setUsuarios(usuariosObtenidos);
            } catch (error) {
                console.error("Error al cargar los usuarios:", error);
            }
        };
        cargarUsuarios();
    }, []);

    //Agregar un nuevo usuario a la lista
    const agregarUsuario = (nuevoUsuario) => {
        setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuario]);
    }

    //Reemplazar todos los usuarios
    const actualizarUsuarios = async () => {
        try {
            console.log("Actualizando usuarios...");
            const lista = await getAllUsers();
            console.log(lista.map(usuario => usuario.nickName));
            setUsuarios(lista);
        } catch (error) {
            console.error("Error al actualizar los usuarios:", error);
        }
    }

    return (
        <UsuariosContext.Provider value={{ usuarios, agregarUsuario, actualizarUsuarios }}>
            {children}
        </UsuariosContext.Provider>
    );
};