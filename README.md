# SIH INTERNAL - Alumni Connect

## Overview
**Alumni Connect** is a comprehensive platform developed during the Smart India Hackathon (SIH) 2024. The platform aims to bridge the gap between students, alumni, and the college by fostering meaningful connections and interactions. Through this platform, students can connect with alumni, alumni can stay connected with the college, and the college can stay informed about the success stories of its graduates.

## Features
- **Student to Alumni Connection:**  
  Students can connect with alumni to seek guidance, mentorship, and career advice.
  
- **Alumni to College Connection:**  
  Alumni can stay updated with college events, donate to their alma mater, and give back through various initiatives.

- **Alumni to Student Connection:**  
  Alumni can post job opportunities, share industry insights, and help students with networking.

## Key Components
- **Registration & Login:**  
  Separate registration and login for students, alumni, and admins. User authentication is secured through JWT tokens.
  
- **Profile Management:**  
  Alumni can update their profiles with their professional and academic details, including their bio, current employer, job title, and more.
  
- **Alumni Directory:**  
  A searchable directory of alumni, displaying their profile pictures, degree, graduation year, current job, and other relevant information.

- **Job Portal:**  
  Alumni can post job openings, and students can apply through direct application links.

- **Donation Portal:**  
  Alumni can contribute to the college through the donation portal, helping fund various initiatives and scholarships.

- **Events & Reunions:**  
  A section for alumni to view upcoming college events and register for reunions and webinars.

- **Success Stories:**  
  Highlighting alumni achievements and success stories to inspire students and showcase alumni impact.

## Tech Stack
- **Frontend:**  
  HTML, CSS, JavaScript
  
- **Backend:**  
  Node.js, Express, MongoDB
  
- **Libraries & Tools:**  
  - Axios for HTTP requests
  - Multer for file uploads
  - Bcrypt for password hashing
  - JWT for authenticatio
  - Mongoose for MongoDB schema management

## Installation & Setup
1. Clone the repository:
   ```bash
`   git clone `https://github.com/your-username/SIH-INTERNAL-Alumni-Connect.git``
2.   Navigate to the project directory
`    cd SIH-INTERNAL-Alumni-Connect`
3. Install dependencies:
`npm install`
4.Set up environment variables: Create a .env file and add the following:
`MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret
    PORT=5000`
