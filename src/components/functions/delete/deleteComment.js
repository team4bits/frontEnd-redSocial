import { API_URL, apiEndpoints } from '../../../config/api'

export async function deleteComment(commentId) {
    const confirmar = window.confirm(
      "¿Estás seguro de que querés eliminar este comentario?"
    );
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}${apiEndpoints.comments}/${commentId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar el comentario");

      alert("Comentario eliminado correctamente.");
      window.dispatchEvent(new Event("nuevo-comment-eliminado"));
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("Hubo un error al eliminar el comentario.");
    }
}