import { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { getAllTags } from './functions/get/getAllTags';

const FormTag = ({ show, onHide }) => {
    const [tags, setTags] = useState([]);
    const [tagsSeleccionados, setTagsSeleccionados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (show) {
            fetchTags();
        }
    }, [show]);

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

    const handleAgregar = () => {
        onHide();
    };

    const handleCerrar = () => {
        setTagsSeleccionados([]);
        setError(null);
        onHide();
    };

    return (
        <Modal show={show} onHide={handleCerrar}>
            <Modal.Header closeButton>
                <Modal.Title>Asignar Tags al Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading && (
                    <div className="text-center py-3">
                        <Spinner animation="border" size="sm" className="me-2" />
                        <span>Cargando tags...</span>
                    </div>
                )}

                {error && (
                    <Alert variant="warning" className="mb-3">
                        {error}
                    </Alert>
                )}

                {!loading && (
                    <>
                        <p className="text-muted mb-3">Selecciona los tags que deseas agregar:</p>
                        
                        {tagsDisponibles && tagsDisponibles.length > 0 ? (
                            <div className="d-flex flex-column gap-2">
                                {tagsDisponibles.map((tag, index) => (
                                    <Form.Check
                                        key={index}
                                        type="checkbox"
                                        id={`tag-${index}`}
                                        label={
                                            <span className="d-flex align-items-center">
                                                <span 
                                                    className="badge bg-success me-2"
                                                    style={{ fontSize: '0.8rem' }}
                                                >
                                                    #{tag}
                                                </span>
                                            </span>
                                        }
                                        checked={tagsSeleccionados.includes(tag)}
                                        onChange={(e) => handleTagChange(tag, e.target.checked)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted">No hay tags disponibles</p>
                        )}

                        {tagsSeleccionados.length > 0 && (
                            <div className="mt-3 p-2 bg-light rounded">
                                <small className="text-muted">Tags seleccionados:</small>
                                <div className="d-flex flex-wrap gap-1 mt-1">
                                    {tagsSeleccionados.map((tag, index) => (
                                        <span key={index} className="badge bg-primary">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-warning" onClick={onHide}>
                    Crear Nuevo Tag
                </Button>
                <Button 
                    variant="success" 
                    onClick={handleAgregar}
                    disabled={tagsSeleccionados.length === 0 || loading}
                >
                    Agregar ({tagsSeleccionados.length})
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FormTag;