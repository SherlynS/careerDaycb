import React from 'react';
import { Card, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./RoadmapCardTemplate.css"; // Import your CSS file

const RoadmapCardTemplate = ({ occupation, index }) => {
    const { title, description } = occupation;

    // Define the titles for each section
    const sectionTitles = [
        "Freshman Year",
        "Sophomore Year",
        "Junior Year",
        "Senior Year"
    ];

    // Determine the title based on the section index
    const getTitleForSection = (index) => {
        // Determine the section index based on the card index
        const sectionIndex = Math.floor(index / 3);
        return sectionTitles[sectionIndex] || "";
    };

    // Determine whether to show the headline based on the index
    const showHeadline = (index + 1) % 3 === 0; // Show headline after every 3 cards

    return (
        <div className="container">
            {showHeadline && (
                <div className="headline-section">
                    <h2 className="roadmap-headline">{getTitleForSection(index)}</h2> {/* Dynamic headline text */}
                </div>
            )}
            <div className={`row ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <Card className='rounded_circle' style={{ width: '200px', height: '200px' }}>
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
                                <Card.Text dangerouslySetInnerHTML={{ __html: description }} />
                            </Col>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default RoadmapCardTemplate;

