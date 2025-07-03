import { API_URL, apiEndpoints } from '../../../config/api'

export async function deletePost(postId) {
    const confirmar = window.confirm(
      "¿Estás seguro de que querés eliminar este post?"
    );
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}${apiEndpoints.posts}/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar el post");

      alert("Post eliminado correctamente.");
      window.dispatchEvent(new Event("nuevo-post-eliminado"));
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("Hubo un error al eliminar el post.");
    }
}