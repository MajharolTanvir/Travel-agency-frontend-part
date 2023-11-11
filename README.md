# Quick Tour Plan
Quick Tour Plan is a website where users can customize their visiting plans. They see the district, places, hotels, rooms, and packages. They book hotel rooms, transports, and guides customized. But They can also go with any tour package.

## Description

- [Live link](https://frontend-part-six.vercel.app/)
- [Server live link](https://qtp-backend.vercel.app/api/v1/)
- [Github Front-end link](https://github.com/MajharolTanvir/Travel-agency-frontend-part.git)
- [Github backend link](https://github.com/MajharolTanvir/Travel-agency-backend.git)

## SRS (SOFTWARE REQUIREMENT SPECIFICATION)

### ENTITY:

- Super_admin
- Admin
- district_coordinator
- Managers
- Guide
- support
- Traveler

## Specific requirements:

### Common functionality:

1. Everyone creates an account as a traveler.
2. Everyone validated their accounts by mail.
3. Everyone will log in and log out from the website.
4. Everyone will update their profile.
5. Everyone will show the district, places, hotels, rooms, and packages.
6. Everyone will customize their visiting plan and book group travel.

### Super_admin functionality:

- The super admin can manage all of the users.
    - Manage all Admins
    - Manage all Head manager
    - Manage all Managers
    - Manage all Guide
    - Manage all support
    - Manage all Traveler 
    

### Admin functionality:

- The admin will make packages.
- The admin will manage packages.
- The admin will manage transport.
- The district coordinator will see all of the traveler feedback.

### District coordinator functionality:

- The district coordinator will create Divisions.
- The district coordinator will create Districts.
- The district coordinator will create places.
- The district coordinator will create room facilities.

### Managers functionality:

- The managers will create hotels.
- The managers will create rooms.
- The managers will manage room booking.

### Guide functionality:

- A guide will manage the guide bookings.
- A guide will post tour photos in the photo gallery.
- A guide will post blogs about his visit.

### Support user functionality:

- A support member will contact all booked travelers.
- A support member will communicate all transport 
- A support member will give support for any issues.

### Traveler functionality:

- Travelers will see the districts, places, hotels, rooms, and guides.
- Travelers can book any room with a start and end date.
- Travelers can book any transport for a start and end date.
- Travelers can book any package by visiting a group tour.
- After successfully traveling the traveler can give reviews.
- After successfully traveling the traveler can give feedback.

## Technologies:
#### Front-end part:
- Next.js (Page router)
- Tailwind.css
- Material UI
- Jwt decode
- Swiper
- Yup
- Stripe


#### Backend-end part:
- Node.js
- Express.js
- Prisma
- PostgreSQL
- Zod validation
- Json web token
- Bcrypt
- Nodemailer
- Rendomstring