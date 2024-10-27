import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../card.css"; // Import Bootstrap CSS

const CardTemplate = ({ occupation }) => {
    const { onet_code, title, annual_median_salary, description, education_levels, industry_id, id, industryName } = occupation;

    let educationDisplay = "";
    if(education_levels && education_levels.category === null){
        educationDisplay = "Not specified";
    }
    else if(education_levels){
        educationDisplay = education_levels.category.join(", ");
    }

    let salaryDisplay = annual_median_salary;
    if(annual_median_salary === null){
        salaryDisplay = "Not specified";
    }

    return (
        <Card style={{ width: '50rem', marginBottom:  "30px"}} className="container d-flex justify-content-center align-items-center">
        <Card.Body className='card-spacing'>
          <Row>
                <Col>
                    <Card.Title className='custom-card-title'>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">{industryName}</Card.Subtitle>
                </Col>
                <Col className='purple-background'>
                    <Card.Text>Median Yearly Income: <span className="salary-amount">{salaryDisplay}</span> </Card.Text>
                    <Card.Text>Most Common Education:<span className='education-degreed'>{educationDisplay}</span></Card.Text>
                    <Button>Roadmap</Button>
                    <Button>Simulation</Button>
                </Col>
            </Row>
            </Card.Body>
          
        </Card>
    );
}

export default CardTemplate;