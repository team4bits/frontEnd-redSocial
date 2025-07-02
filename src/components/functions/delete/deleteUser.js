import { API_URL, apiEndpoints } from "../../../config/api";

//Función de delete a un user by objectId

export async function deleteUser(objectId) {
    try {
        const response = await fetch(`${API_URL}${apiEndpoints.users}/${objectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el usuario');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}