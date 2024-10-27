import React from 'react';
import { Card, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../RoadmapCardTemplate.css"; // Import Bootstrap CSS

const RoadmapCardTemplate = ({ occupation, index }) => {
    const { title, description } = occupation;

    return (
        <div className="container">
            <div className={`row ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <Card  className='rounded_circle ' style={{ width: '200px', height: '200px' }} >
                            <Col>
                                <Card.Title className='card-spacing' style={{ width: '200px', height: '200px' }}>{title}</Card.Title>
                            </Col>
                    
                    </Card>
                </div>
                <div className="col-md-6">
                    <Card style={{ margin: "30px" }}>
                        <Card.Body className='card-spacing'>
                            <Col>
                                <Card.Title className='custom-card-title'>{title}</Card.Title>
                            </Col>
                        </Card.Body>
                    </Card>
                    <Card style={{ margin: "30px" }}>
                        <Card.Body className='card-spacing'>
                            <Col>
                                <Card.Text>{description}</Card.Text>
                                <Card.Subtitle className="mb-2 text-muted">{description}</Card.Subtitle>
                            </Col>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default RoadmapCardTemplate;
