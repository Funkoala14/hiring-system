import House from "../models/House.js"; // Import the House model
import mongoose from "./connection.js"; // Import the DB connection
import Employee from "../models/Employee.js";
import User from "../models/User.js";

// Seed Houses
const seedHouses = async () => {
    const houses = [
        {
            address: {
                building: "Building 1",
                street: "123 Main St",
                city: "New York",
                state: "NY",
                zip: "10001",
            },
            landlord: {
                name: "John Doe",
                phone: "123-456-7890",
                email: "johndoe@example.com",
            },
            residents: []
        },
        {
            address: {
                building: "Building 2",
                street: "456 Oak Ave",
                city: "Los Angeles",
                state: "CA",
                zip: "90001",
            },
            landlord: {
                name: "Jane Smith",
                phone: "987-654-3210",
                email: "janesmith@example.com",
            },
            residents: []
        },
    ];

    // Clear existing houses and insert new ones
    await House.deleteMany(); // Clear any existing data
    const savedHouses = await House.insertMany(houses); // Save the new houses to DB

    return savedHouses;
};

// Seed Employees
const seedEmployees = async (houses) => {
    const users = [
        {
            username: "emp1",
            firstName: "John",
            lastName: "Doe",
            ssn: "123-45-6789",
            phone: "555-1234-567",
            email: "emp1@mail.com",
            password: "Pw@123456", // Will be hashed before saving
            role: "Employee",
            housingAssignment: houses[0]._id, // Assign employee1 to the first house
        },
        {
            username: "emp2",
            firstName: "Jane",
            lastName: "Smith",
            ssn: "987-65-4321",
            phone: "555-9876-543",
            email: "emp2@mail.com",
            password: "Pw@123456",
            role: "Employee",
            housingAssignment: houses[1]._id, // Assign employee2 to the second house
        },
        {
            username: "emp3",
            firstName: "Michael",
            lastName: "Jones",
            ssn: "543-21-9876",
            phone: "555-6543-321",
            email: "emp3@mail.com",
            password: "Pw@123456",
            role: "Employee",
            housingAssignment: houses[0]._id, // Assign employee3 to the first house
        },
        {
            username: "emp4",
            firstName: "Mark",
            lastName: "Taylor",
            ssn: "112-33-4455",
            phone: "555-2234-567",
            email: "mark.taylor@mail.com",
            password: "Pw@123456", 
            role: "Employee",
            housingAssignment: houses[1]._id,
        },
        {
            username: "hr",
            email: "hr@mail.com",
            password: "Hrpw@123456",
            role: "HR", // HR role, no housing assignment
        },
    ];

    // Clear existing users in the database
    await Employee.deleteMany();

    // Loop over each user and save it using Employee.save()
    for (let userData of users) {
        const user = new Employee(userData); // Create a new User instance
        await user.save(); // Save the user, triggering password hashing

        if (user.housingAssignment) {
            await House.findByIdAndUpdate(
                user.housingAssignment, 
                { $addToSet: { residents: user._id } } // add employee to residents list
            );
        }
    }

    
    console.log("Employees seeded successfully");
};

// Run the seed function
const seed = async () => {
    try {
        const houses = await seedHouses(); // Seed houses first
        await seedEmployees(houses); // Then seed users with housing assignments
        // await seedHR();
    } catch (error) {
        console.error("Seeding failed:", error);
    } finally {
        mongoose.close(); // Close the connection when done
    }
};

seed();
