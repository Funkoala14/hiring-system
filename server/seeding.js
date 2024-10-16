import User from './models/User.js'; // Import the User model
import House from './models/House.js'; // Import the House model
import mongoose from './config/connection.js' // Import the DB connection

// Seed Houses
const seedHouses = async () => {
    const houses = [
        {
            address: {
                building: 'Building 1',
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zip: '10001'
            },
            landlord: {
                name: 'John Doe',
                phone: '123-456-7890',
                email: 'johndoe@example.com'
            }
        },
        {
            address: {
                building: 'Building 2',
                street: '456 Oak Ave',
                city: 'Los Angeles',
                state: 'CA',
                zip: '90001'
            },
            landlord: {
                name: 'Jane Smith',
                phone: '987-654-3210',
                email: 'janesmith@example.com'
            }
        }
    ];

    // Clear existing houses and insert new ones
    await House.deleteMany();  // Clear any existing data
    const savedHouses = await House.insertMany(houses);  // Save the new houses to DB
    
    return savedHouses;
};

// Seed Users
const seedUsers = async (houses) => {
    const users = [
        {
            username: 'emp1',
            email: 'emp1@mail.com',
            password: 'Pw@123456',  // Will be hashed before saving
            role: 'Employee',
            housingAssignment: houses[0]._id, // Assign employee1 to the first house
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            username: 'emp2',
            email: 'emp2@mail.com',
            password: 'Pw@123456',
            role: 'Employee',
            housingAssignment: houses[1]._id, // Assign employee2 to the second house
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            username: 'emp3',
            email: 'emp3@mail.com',
            password: 'Pw@123456',
            role: 'Employee',
            housingAssignment: houses[0]._id, // Assign employee3 to the first house
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            username: 'hr',
            email: 'hr@mail.com',
            password: 'Hrpw@123456',
            role: 'HR',  // HR role, no housing assignment
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ];

    // Clear existing users in the database
    await User.deleteMany();

    // Loop over each user and save it using User.save()
    for (let userData of users) {
        const user = new User(userData); // Create a new User instance
        await user.save(); // Save the user, triggering password hashing
    }

    console.log('Users seeded successfully');
};

// Run the seed function
const seed = async () => {
    try {
        const houses = await seedHouses(); // Seed houses first
        await seedUsers(houses);           // Then seed users with housing assignments
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        mongoose.connection.close();  // Close the connection when done
    }
};

seed();
