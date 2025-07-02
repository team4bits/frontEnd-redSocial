import { API_URL, apiEndpoints } from "../../../config/api";

const getUserByObjectId = async (objectId) => {
    try {
        const response = await fetch(`${API_URL}${apiEndpoints.users}/${objectId}`);
        if (!response.ok) {
            throw new Error('Error al obtener el usuario');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export default getUserByObjectId;
