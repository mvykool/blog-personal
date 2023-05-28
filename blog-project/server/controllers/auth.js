import { db } from '../db.js';
import bcrypt from 'bcryptjs';

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"; // Query to check existing user

    db.query(q, [req.body.email, req.body.username], (error, data) => {

        if (error) return res.json(error); // If there's an error, return it as a JSON response
        if (data.length) return res.status(409).json("User already exists"); // If user already exists, return a JSON response with status 409 (Conflict)

        const salt = bcrypt.genSaltSync(10); // Generate a salt for password hashing
        const hash = bcrypt.hashSync(req.body.password, salt); // Hash the password using bcrypt

        const insertQuery = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)"; // Query to insert a new user

        const values = [
            req.body.username,
            req.body.email,
            hash,
        ]; // Values to be inserted

        db.query(insertQuery, [values], (error, data) => {

            if (error) return res.json(error); // If there's an error, return it as a JSON response
            return res.status(200).json("User has been created"); // If successful, return a JSON response with status 200 (OK)
        });
    });
};

export const login = (req, res) => {

}

export const logout = (req, res) => {

}