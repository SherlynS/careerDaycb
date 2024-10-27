import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Dropdown, DropdownButton, Navbar, Form, Row, Col } from "react-bootstrap";
import "./CareerPage.css";
import CardTemplate from "../components/CardTemplate";
import educationOptions from "../data/education"; // Importing education options
import incomeOptions from "../data/income";
import Pagination from '../components/Pagination';
import "../components/Pagination.css";



function CareerPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndustries, setSelectedIndustries] = useState("");
    const [selectedEducations, setSelectedEducations] = useState(""); // State to store selected education options
    const [selectedSalaries, setSelectedSalaries] = useState("");
    const [careers, setCareers] = useState([]); //Store occupations
    const [currentPage, setCurrentPage] = useState(1);
    const [industries, setIndustries] = useState([]);
    const [filteredOccupations, setFilteredOccupations] = useState([]);
    const itemsPerPage = 20;
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      setCurrentPage(1);
    };
  
    const handleIndustrySelect = (industry) => {
      setSelectedIndustries(industry);
      setCurrentPage(1);
    };

    const handleEducationSelect = (education) => {
      setSelectedEducations(education); // Add selected education option
      setCurrentPage(1);
    };

    const handleSalarySelect = (salary) => {
        setSelectedSalaries(salary);
        setCurrentPage(1);
    };


    useEffect(() => {  
    const filteredResults = careers.filter(occupation => {
        const matchesSearchQuery = occupation.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesIndustry = !selectedIndustries || occupation.name.toLowerCase().includes(selectedIndustries.toLowerCase());
        const matchesEducation = !selectedEducations || (
            occupation.education_levels && 
            (
                occupation.education_levels.category.includes(selectedEducations) ||
                occupation.education_levels.length === 0 // Handle occupations with no education_levels
            )
        );
        const matchesSalary = !selectedSalaries || (selectedSalaries.includes('-') ? 
        (() => {
            const [min, max] = selectedSalaries.split('-').map(Number);
            return occupation.annual_median_salary >= min && occupation.annual_median_salary <= max;
        })() : 
        occupation.annual_median_salary >= Number(selectedSalaries)
    );
        return matchesSearchQuery && matchesIndustry && matchesEducation && matchesSalary;
    });
        setFilteredOccupations(filteredResults);
        console.log('Filtered Results Updated: ', filteredResults);
        setCurrentPage(1);
    }, [selectedIndustries, selectedEducations, selectedSalaries, searchQuery]);
    
    const fetchCareers = async() => {
        const data = await fetch('/careers');
        const items = await data.json();
        setCareers(items);
        setFilteredOccupations(items);
    }

    const fetchIndustries = async() => {
        const data = await fetch('/api/industries');
        const items = await data.json();
        setIndustries(items);
        console.log(items);
    }

    useEffect(() => {
        fetchCareers();
        fetchIndustries();
    }, []);

    const removeFilter = (filterType) => {
        switch (filterType) {
            case 'industry':
                setSelectedIndustries("");
                break;
            case 'education':
                setSelectedEducations("");
                break;
            case 'salary':
                setSelectedSalaries("");
                break;
            default:
                break;
        }
        setCurrentPage(1);
        setFilteredOccupations(careers);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCareers = filteredOccupations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredOccupations.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    

    return (
        <>
            <header style={{ padding: '60px', textAlign: 'center', margin:'5px'}}>
                <h1 className="some-class">List of Careers</h1> 
            </header>
            <hr></hr>
            <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-3">
                <div className="mb-2 mb-md-0 d-flex">

                <DropdownButton 
                        title="Salary"
                        id="salary-dropdown"
                        className="dropdown-industry" 
                    >
                        {incomeOptions.map((salary, index) => (
                            <Dropdown.Item  key={index} onClick={() => handleSalarySelect(salary.value)}>
                                {salary.label}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton> 

                    
                     <DropdownButton 
                        title="Education"
                        id="education-dropdown"
                        className="dropdown-industry" 
                        // style={{right: 0}}
                        // onClick={toggleBox} // Call toggleBox function on button click
                    >
                        {educationOptions.map((education, index) => (
                                    <Dropdown.Item  key={index} onClick={() => handleEducationSelect(education.value)}>
                                        {education.label}
                                    </Dropdown.Item>
                                ))}
                        
                    </DropdownButton> 
                 
                    <DropdownButton 
                        title="Industry"
                        id="industry-dropdown"
                        className="dropdown-industry" 
                    >
                                {industries.map((industry, index) => (
                                    <Dropdown.Item  key={index} onClick={() => handleIndustrySelect(industry.name)}>
                                        {industry.name}
                                    </Dropdown.Item>
                                ))}
                            
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
            <div style={{ padding: '20px' }}>
                <div>
                    {selectedIndustries && (
                        <Button variant="outline-primary" className = "filter-button" onClick={() => removeFilter('industry')}>
                            {selectedIndustries} <span aria-hidden="true">&times;</span>
                        </Button>
                    )}
                    {selectedEducations && (
                        <Button variant="outline-primary" className = "filter-button" onClick={() => removeFilter('education')}>
                            {selectedEducations.charAt(0).toUpperCase() + selectedEducations.slice(1)} <span aria-hidden="true">&times;</span>
                        </Button>
                    )}
                    {selectedSalaries && (
                        <Button variant="outline-primary" className = "filter-button" onClick={() => removeFilter('salary')}>
                            {selectedSalaries.includes('-') 
                            ? `$${Number(selectedSalaries.split('-')[0]).toLocaleString()}-$${Number(selectedSalaries.split('-')[1]).toLocaleString()}` 
                            : `$${Number(selectedSalaries).toLocaleString()}`} <span aria-hidden="true">&times;</span>
                        </Button>
                    )}
                </div>
            </div>
            <div style={{ padding: '60px'}}>
                <div key={currentPage}>
                    {currentCareers.map((occupation) => (
                        <CardTemplate key={occupation.onet_code} occupation={occupation} />
                    ))}
                </div>
                <div className = "pagination-wrapper">
                <Pagination
                    totalPages = {totalPages}
                    currentPage = {currentPage}
                    handlePageChange = {handlePageChange}
                /> 
                </div>
            </div>
        </>
    );
}

export default CareerPage;
