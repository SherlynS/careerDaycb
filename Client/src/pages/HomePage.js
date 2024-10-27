import React from "react";

import "bootstrap/dist/css/bootstrap.min.css"
import "./HomePage.css"
import images_roadmap from '../images/roadmap.png';
import images_resource from '../images/resource.jpg'
import Container from 'react-bootstrap/Container';
import images_questions from '../images/questions.jpg';
import images_notes from '../images/notes.jpg';
import { Button } from "react-bootstrap";





function HomePage(props) {
    return (
      <>
      <Container>
      <div className="image-with-text">
        <div className="image-container">
          <img src={images_roadmap} alt={props.imageAlt} className="image" />
        </div>
        <div className="text">
          <h1 style={{ fontWeight: 'bold' }}>Explore your career path.</h1>
          <p>
            Feeling confused about what to pursue? Having trouble making a decision? CareerDay is
            the place to be! Imagine having a roadmap for achieving your career goals.
          </p>
          <Button className="start-button">Get Started!</Button>
        </div>
      </div>
      </Container>
  
  {/* Our serivces! */}
      <div>
      <h1 className="title">What we provide!</h1>


      <div className="provide">
        <div className="text-provide">
          <div>
            <h1 style={{ fontWeight: 'bold' }}>Entertaining game simulation</h1>
            <p>
              Feeling confused about what to pursue? Having trouble making a decision? This game
              simulation will help you find the career that best suits you.
            </p>
          </div>
          <div className="image-circle">
            <img src={images_resource} alt={props.imageAlt} className="circular-image" />
          </div>
        </div>
      </div>
    </div>

    <div>
                <div className="background_provide">
                    <div className="text-provide">
                           <div className="image-circle">
                            <img src={images_notes } alt={props.imageAlt} className="image" />
                            </div>

                    <p><h1 style={{  fontWeight: 'bold' }}>Resources: Skills, Major, Education </h1>
                   We will provide you a personalize roadmap though AI, all you need to do is provide us 
                   a little bit information of you.</p>
                 </div>
             </div>
        </div>
   

        <div>
            
                <div className="provide">
                    <div className="text-provide">
                    <p><h1 style={{  fontWeight: 'bold' }}>Quizzes to minimize your career path </h1>
                    Don't let the list make you feel overwhelmed. We create a personalized quiz
                     to help you make an inform decisons. </p>
              
        
                     <div className="image-circle">
            <img src={images_questions} alt={props.imageAlt} className="circular-image" />
          </div>
                 </div>
             </div>
        </div>

{/* End of the services */}

<div className="custom-container">
      <h1 className="title">Try the educational app that helps you find you next career!</h1>
      <div className="custom-content">
        <p className="custom-paragraph" >
        So many choices, so little time. Let CareerDay take care of all your trouble!
        </p>
        <Button className="start-button">Sign Up! It's free!</Button>
      </div>
    </div>


{/* Footer */}
 
      <footer className="footer">
        <div className="left-section">
          <p>
            <span className="text-container">CareerDay</span>
            <p className="bottom-text">A website where students can
             explore various career paths through game simulations and
              receive AI-generated career roadmaps
            </p>
          </p>
        </div>
        <div className="right-section">
          <p>
            {/* <span className="text-container">CareerDay</span>
            <p className="bottom-text">
              Phone:555-555-555  <br />
              Email: careerday@gmail.com <br />
              Follow us: Facebook, Instagram, LinkedIn
            </p> */}
          </p>
        </div>
      </footer>


        </>
        );
    }
  
  export default HomePage;