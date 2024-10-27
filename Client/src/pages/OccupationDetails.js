// const apiKey = '5ygrSguMXGrfiq1q+NBaxQQiuzHyUog+0mF5VBV2NgZNFUC/I41szZ/FYxQbAk5sOVLQ9Ew9F2+t44lvwujh2w=='; // Replace 'YOUR_API_KEY' with your actual API key
// const onetTitle = 'Software Developer'; // Replace 'Software Developer' with the ONET title or code for the occupation you're interested in
// const location = 'California'; // Replace 'California' with the location for which you want to retrieve data

// // Construct the API request URL
// const apiUrl = `https://api.careeronestop.org/v1/occupation/${apiKey}/${onetTitle}/${location}`;

// // Make the API request
// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Handle the API response data
//     console.log(data);
//     // Process the occupation details and display them in your application
//   })
//   .catch(error => {
//     // Handle any errors that occurred during the API request
//     console.error('There was a problem with the API request:', error);
//   });
// require('dotenv').config();
// const username = process.env.REACT_APP_ONET_USER;
// const password = process.env.REACT_APP_ONET_PASSWORD
// const authString = `${username}:${password}`;
// const encodedAuth = Buffer.from(authString, 'utf-8').toString('base64');
// fetch("https://services.onetcenter.org/ws/mnm/careers/", {
//     headers: {
//         Authorization: `Basic ${encodedAuth}`
//     }   
// })
//     .then(response => {
//         if(!response.ok){
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
