import { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { getAllTags } from './functions/get/getAllTags';

const FormTag = ({ show, onHide, onTagsSelected, post }) => {
    const [tags, setTags] = useState([]);
    const [tagsSeleccionados, setTagsSeleccionados] = useState([]);
    const [tagsExistentes, setTagsExistentes] = useState([]); // ✅ Tags ya asignados al post
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (show) {
            fetchTags();
            // ✅ Cargar tags existentes del post si hay un post
            if (post && post._id) {
                cargarTagsDelPost();
            }
        }
    }, [show, post]);

    const fetchTags = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const tagsRecibidos = await getAllTags();
            setTags(tagsRecibidos || []);
        } catch (error) {
            setError('Error al cargar los tags' + (error.message ? `: ${error.message}` : ''));
            setTags([]);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Función para cargar tags ya asignados al post
    const cargarTagsDelPost = async () => {
        try {
            console.log(`🔍 Cargando tags del post ${post._id}`);
            
            const response = await fetch(`http://localhost:3001/posts/${post._id}/tags`);
            
            if (response.ok) {
                const tagsDelPost = await response.json();
                console.log('📋 Tags existentes:', tagsDelPost);
                
                // Extraer nombres de tags
                const nombresTagsExistentes = tagsDelPost.map(tag => 
                    tag.nameTag || tag.name || tag
                );
                
                setTagsExistentes(nombresTagsExistentes);
                setTagsSeleccionados(nombresTagsExistentes); // ✅ Pre-seleccionar tags existentes
            }
        } catch (error) {
            console.error('Error al cargar tags del post:', error);
        }
    };

    const tagsDisponibles = tags.map(tag => tag.nameTag || tag.name || tag);

    const handleTagChange = (tag, isChecked) => {
        if (isChecked) {
            if (!tagsSeleccionados.includes(tag)) {
                setTagsSeleccionados([...tagsSeleccionados, tag]);
            }
        } else {
            setTagsSeleccionados(tagsSeleccionados.filter(t => t !== tag));
        }
    };

    const quitarTag = (tagAQuitar) => {
        setTagsSeleccionados(tagsSeleccionados.filter(tag => tag !== tagAQuitar));
    };

    // ✅ Función mejorada para asignar/desasignar tags
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setSubmitting(true);
        setError(null);

        try {
            if (post && post._id) {
                let operacionesExitosas = 0;
                let errores = [];

                // ✅ Determinar qué tags agregar y cuáles quitar
                const tagsParaAgregar = tagsSeleccionados.filter(tag => !tagsExistentes.includes(tag));
                const tagsParaQuitar = tagsExistentes.filter(tag => !tagsSeleccionados.includes(tag));

                console.log('📝 Tags para agregar:', tagsParaAgregar);
                console.log('🗑️ Tags para quitar:', tagsParaQuitar);

                // ✅ Agregar nuevos tags
                for (const tagName of tagsParaAgregar) {
                    try {
                        console.log(`➕ Agregando tag: ${tagName}`);
                        
                        // ✅ Encontrar el objeto tag completo para obtener su _id
                        const tagObj = tags.find(t => 
                            (t.nameTag || t.name || t) === tagName
                        );
                        
                        if (!tagObj || !tagObj._id) {
                            throw new Error(`No se encontró el _id para el tag "${tagName}"`);
                        }

                        const response = await fetch(`http://localhost:3001/posts/${post._id}/tags/${tagObj._id}`, {
                            method: 'PUT', // ✅ PUT para agregar
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                tagName: tagName
                            })
                        });

                        if (!response.ok) {
                            const errorData = await response.text();
                            throw new Error(`Error al agregar "${tagName}": ${errorData}`);
                        }

                        operacionesExitosas++;
                        console.log(`✅ Tag "${tagName}" agregado`);

                    } catch (error) {
                        console.error(`❌ Error agregando "${tagName}":`, error);
                        errores.push(`Agregar ${tagName}: ${error.message}`);
                    }
                }

                // ✅ Quitar tags desmarcados
                for (const tagName of tagsParaQuitar) {
                    try {
                        console.log(`➖ Quitando tag: ${tagName}`);
                        
                        // ✅ Encontrar el objeto tag completo para obtener su _id
                        const tagObj = tags.find(t => 
                            (t.nameTag || t.name || t) === tagName
                        );
                        
                        if (!tagObj || !tagObj._id) {
                            throw new Error(`No se encontró el _id para el tag "${tagName}"`);
                        }

                        const response = await fetch(`http://localhost:3001/posts/${post._id}/tags/${tagObj._id}`, {
                            method: 'DELETE', // ✅ DELETE para quitar
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                tagName: tagName
                            })
                        });

                        if (!response.ok) {
                            const errorData = await response.text();
                            throw new Error(`Error al quitar "${tagName}": ${errorData}`);
                        }

                        operacionesExitosas++;
                        console.log(`✅ Tag "${tagName}" quitado`);

                    } catch (error) {
                        console.error(`❌ Error quitando "${tagName}":`, error);
                        errores.push(`Quitar ${tagName}: ${error.message}`);
                    }
                }

                // ✅ Mostrar resultado
                const totalOperaciones = tagsParaAgregar.length + tagsParaQuitar.length;
                
                if (totalOperaciones === 0) {
                    alert('No hay cambios que realizar');
                } else {
                    let mensaje = `✅ ${operacionesExitosas}/${totalOperaciones} operación(es) exitosa(s)`;
                    
                    if (errores.length > 0) {
                        mensaje += `\n\nErrores:\n${errores.join('\n')}`;
                    }
                    
                    alert(mensaje);
                    
                    // Disparar eventos para actualizar vistas
                    window.dispatchEvent(new Event("post-actualizado"));
                    window.dispatchEvent(new Event("perfil-actualizado"));
                    window.dispatchEvent(new Event("nuevo-post-creado"));
                }
            }

            // Enviar al componente padre
            if (onTagsSelected) {
                onTagsSelected(tagsSeleccionados);
            }

            handleCerrar();

        } catch (error) {
            console.error('Error general:', error);
            setError('Error al procesar tags: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCerrar = () => {
        setTagsSeleccionados([]);
        setTagsExistentes([]);
        setError(null);
        onHide();
    };

    return (
        <Modal show={show} onHide={handleCerrar} size="lg">
            <Modal.Header closeButton className="bg-dark text-light">
                <Modal.Title>
                    <i className="bi bi-tags me-2"></i>
                    {post ? 'Editar Tags del Post' : 'Seleccionar Tags'}
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body className="bg-dark text-light">
                    {loading && (
                        <div className="text-center py-3">
                            <Spinner animation="border" size="sm" className="me-2" variant="light" />
                            <span>Cargando tags...</span>
                        </div>
                    )}

                    {error && (
                        <Alert variant="danger" className="mb-3">
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            {error}
                        </Alert>
                    )}

                    {!loading && (
                        <>
                            {/* ✅ Mostrar tags existentes si hay */}
                            {post && tagsExistentes.length > 0 && (
                                <div className="mb-3 p-3 bg-info bg-opacity-10 rounded border border-info">
                                    <h6 className="text-info mb-2">
                                        <i className="bi bi-info-circle me-2"></i>
                                        Tags actuales del post:
                                    </h6>
                                    <div className="d-flex flex-wrap gap-1">
                                        {tagsExistentes.map((tag, index) => (
                                            <span key={index} className="badge bg-info">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mb-4">
                                <h6 className="text-light mb-3">
                                    <i className="bi bi-list-check me-2"></i>
                                    Selecciona los tags:
                                </h6>
                                
                                {tagsDisponibles && tagsDisponibles.length > 0 ? (
                                    <div className="row g-2">
                                        {tagsDisponibles.map((tag, index) => {
                                            const yaAsignado = tagsExistentes.includes(tag);
                                            const seleccionado = tagsSeleccionados.includes(tag);
                                            
                                            return (
                                                <div key={index} className="col-12 col-sm-6 col-md-4">
                                                    <Form.Check
                                                        type="checkbox"
                                                        id={`tag-${index}`}
                                                        label={
                                                            <span className="d-flex align-items-center">
                                                                <span 
                                                                    className={`badge me-2 ${
                                                                        yaAsignado ? 'bg-info' : 'bg-success'
                                                                    }`}
                                                                    style={{ fontSize: '0.8rem' }}
                                                                >
                                                                    #{tag}
                                                                    {yaAsignado && ' ✓'}
                                                                </span>
                                                            </span>
                                                        }
                                                        checked={seleccionado}
                                                        onChange={(e) => handleTagChange(tag, e.target.checked)}
                                                        className="text-light"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center text-muted py-3">
                                        No hay tags disponibles
                                    </div>
                                )}
                            </div>

                            {/* ✅ Preview de cambios */}
                            {tagsSeleccionados.length > 0 && (
                                <div className="mt-4 p-3 bg-secondary rounded">
                                    <h6 className="text-light mb-3">
                                        <i className="bi bi-check2-circle me-2"></i>
                                        Tags seleccionados ({tagsSeleccionados.length}):
                                    </h6>
                                    <div className="d-flex flex-wrap gap-2">
                                        {tagsSeleccionados.map((tag, index) => {
                                            const esNuevo = !tagsExistentes.includes(tag);
                                            return (
                                                <span 
                                                    key={index} 
                                                    className={`badge d-flex align-items-center gap-1 py-2 px-3 ${
                                                        esNuevo ? 'bg-success' : 'bg-primary'
                                                    }`}
                                                    style={{ fontSize: '0.85rem' }}
                                                >
                                                    #{tag}
                                                    {esNuevo && ' (nuevo)'}
                                                    <button
                                                        type="button"
                                                        className="btn-close btn-close-white ms-1"
                                                        style={{ fontSize: '0.6rem' }}
                                                        onClick={() => quitarTag(tag)}
                                                        aria-label={`Quitar ${tag}`}
                                                    />
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </Modal.Body>

                <Modal.Footer className="bg-dark border-secondary">
                    <div className="d-flex gap-2 w-100 justify-content-between">
                        <Button variant="outline-warning" type="button">
                            <i className="bi bi-plus-circle me-2"></i>
                            Crear Nuevo Tag
                        </Button>
                        
                        <div className="d-flex gap-2">
                            <Button variant="outline-secondary" type="button" onClick={handleCerrar}>
                                <i className="bi bi-x-circle me-2"></i>
                                Cancelar
                            </Button>
                            <Button 
                                variant="success" 
                                type="submit"
                                disabled={loading || submitting}
                            >
                                {submitting ? (
                                    <>
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check2 me-2"></i>
                                        Guardar Cambios
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default FormTag;