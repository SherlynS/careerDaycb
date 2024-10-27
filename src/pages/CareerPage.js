import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Dropdown, DropdownButton, Navbar, Form, Row, Col } from "react-bootstrap";
import "./CareerPage.css";
import data from '../data/occupations';
import CardTemplate from "../components/CardTemplate";
import industryOptions from "../data/industryOptions"; 
import educationOptions from "../data/education"; // Importing education options
import incomeOptions from "../data/income";


function CareerPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedEducations, setSelectedEducations] = useState([]); // State to store selected education options
    const [showBox, setShowBox] = useState(false);
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleIndustrySelect = (industry) => {
      setSelectedIndustries([...selectedIndustries, industry]);
    };

    const handleEducationSelect = (education) => {
      setSelectedEducations([...selectedEducations, education]); // Add selected education option
    };

    const handleFilterChange = () => {
        setSelectedIndustries([]);
        setSelectedEducations([]); // Clear selected education options
    };

    const toggleBox = () => {
        setShowBox(!showBox);
    };

    const filteredOccupations = data.filter(occupation => {
        const matchesSearchQuery = occupation.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.some(industry => occupation.industry.toLowerCase().includes(industry.value.toLowerCase()));
        const matchesEducation = selectedEducations.length === 0 || selectedEducations.some(education => occupation.education.toLowerCase().includes(education.value.toLowerCase()));
        return matchesSearchQuery && matchesIndustry && matchesEducation;
    });
  
    return (
        <>
 
            <header style={{ padding: '60px', textAlign: 'center', margin:'5px'}}>
                <h1 className="some-class">List of Careers</h1> 
            </header>
        
            <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-3">
                <div className="mb-2 mb-md-0 d-flex">

                <DropdownButton 
                        title="Salary"
                        id="education-dropdown"
                        className="dropdown-industry" 
                    >
                        {incomeOptions.map((education, index) => (
                            <Dropdown.Item  key={index} onClick={() => handleEducationSelect(education)}>
                                {education.label}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton> 

                    
                     <DropdownButton 
                        title="Education"
                        id="education-dropdown"
                        className="dropdown-industry" 
                        style={{right: 0}}
                        onClick={toggleBox} // Call toggleBox function on button click
                    >
                        {showBox && (
                            <div className="dropdown-box">
                                {educationOptions.map((education, index) => (
                                    <Dropdown.Item  key={index} onClick={() => handleEducationSelect(education)}>
                                        {education.label}
                                    </Dropdown.Item>
                                ))}
                            </div>
                        )}
                    </DropdownButton> 
                 
                    <DropdownButton 
                        title="Industry"
                        id="industry-dropdown"
                        className="dropdown-industry" 
                        style={{right: 0}}
                        onClick={toggleBox} // Call toggleBox function on button click
                    >
                        {showBox && (
                            <div className="dropdown-box">
                                {industryOptions.map((industry, index) => (
                                    <Dropdown.Item  key={index} onClick={() => handleIndustrySelect(industry)}>
                                        {industry.label}
                                    </Dropdown.Item>
                                ))}
                            </div>
                        )}
                    </DropdownButton>
                </div>
               

                <Navbar >
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
                                        autoFocus
                                        style={{ width: '300px', marginRight: '200px' }}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Navbar>
            </div>
           
            <div style={{ padding: '60px'}}>
                {filteredOccupations.map((occupation, index) => (
                    <CardTemplate key={index} occupation={occupation} />
                ))}
            </div>
        </>
    );
}

export default CareerPage;

