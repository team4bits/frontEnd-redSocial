import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap'; // ← Faltaba este import
import Post from '../Post'; // ← Faltaba este import
import { getFunctions } from '../functions';

const HomeContent = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPostsAndUsers = async () => {
            try {
                // 1. Primero obtener todos los posts
                const posts = await getFunctions.getAllPosts();

                // 2. Luego obtener los usuarios para cada post
                const postsWithUsers = await Promise.all(
                    posts.map(async (post) => {
                        const user = await getFunctions.getUserByObjectId(post.userId);
                        return {
                            ...post,
                            userId: user         //Reemplaza post.userId con los datos completos
                        };
                    })
                );
                postsWithUsers.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordenar por fecha de creación
                // 3. Actualizar el estado una sola vez con todo
                setPosts(postsWithUsers);
            } catch (error) {
                console.error("Error fetching posts and users:", error);
            }
        };

        fetchPostsAndUsers();
    }, []); // ← Se ejecuta solo al montar el componente


    return (
        <>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <Post
                        key={post._id}
                        user={post.userId}
                        post={post}
                    />
                ))
            ) : (
                <Alert variant="info">No hay posts</Alert>
            )}
        </>
    );
}; // ← Cerrar el componente aquí

export default HomeContent;