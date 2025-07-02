import Button from 'react-bootstrap/Button';

const Tag = ( { indice, name } ) => {
    return (
        <Button key={indice} variant="success" size="sm">
            {name}
        </Button>
    )
}

export default Tag