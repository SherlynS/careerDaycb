import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import data from '../occupations';
import ImageTable from '../components/ImageTable';
import { Button, Table} from "react-bootstrap";
import "./CareerPage.css";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardTemplate from "../components/CardTemplate";


function Gaming() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
  };

 


    return (
        <>
        <header style={{ backgroundColor: '#E3DAFF', padding: '20px', textAlign: 'center'}}>
            <h1>Roadmap</h1> 
            </header>
            <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-3">
                <div className="mb-2 mb-md-0">
                    <Button className="career_button">Industry</Button>
                    <Button className="career_button">Salary</Button>
                    <Button className="career_button">Education</Button>
                    <Button className="career_button">Employment</Button>
                </div>

                <Navbar className="bg-body-tertiary mt-2 mt-md-0" >
                    <Form inline>
                        <Row>
                            <Col xs={{ span: 8, offset: 2 }}>
                            <div className="form-inline my-2 my-lg-0 ">
                            <Form.Control
                            
                                    type="text"
                                    placeholder="Search Careers"
                                    className="search-bar "
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    autoFocus // Autofocus on the input field
                                />

                              
                              </div>
                            </Col>
                        </Row>
                    </Form>
                </Navbar>
            </div>
         
        




      
        </>
    );
}


export default Gaming;
