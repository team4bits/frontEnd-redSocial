import { API_URL, apiEndpoints } from "../../../config/api";

export const modificarUsuario = async (id, data) => {
    try {
        const response = await fetch(`${API_URL}${apiEndpoints.users}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Error al modificar el usuario');
        }
        return await response.json();
    } catch (error) {
        console.error('Error en la función modificarUsuario:', error);
        throw error;
    }
}
;

