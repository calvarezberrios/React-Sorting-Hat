import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";

const SortingHat = ({ users, addUser}) => {
    const initialState = {
        id: Math.floor(Math.random() * 10000 + 100),
        name: "",
        email: "",
        password: "",
        wand: "",
        owl: "",
        house: ""
    }
    const [newUser, setNewUser] = useState(initialState);
    const history = useHistory();

    const handleChange = e => {
        e.preventDefault();
        setNewUser({
            ...newUser,
            [e.target.name]:
                e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (newUser.email) {
            if (users.filter(user => user.email === newUser.email).length < 1) {
                axios.get("https://www.potterapi.com/v1/sortingHat/")
                    .then(response => {
                        setNewUser({
                            ...newUser,
                            house: response.data
                        });
                    })
                    .catch(err => console.log("Error getting house", err.message));
            }
        }
    }

    useEffect(() => {
        if(newUser.house){
            addUser(newUser);
            setNewUser(initialState);
            history.push("/house");
        }
    }, [initialState, history, newUser, addUser])


    return (
        <div>
            <h2>Sorting Hat</h2>
            <form id="sortingHatForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input id="name" type="text" name="name" value={newUser.name} placeholder="Enter name" onChange={handleChange} />

                <label htmlFor="email">Email: </label>
                <input id="email" type="text" name="email" value={newUser.email} placeholder="Enter email" onChange={handleChange} />

                <label htmlFor="password">Password: </label>
                <input id="password" type="password" name="password" value={newUser.password} placeholder="Enter a password" onChange={handleChange} />

                <label htmlFor="wand">Choose a Wand: </label>
                <select id="wand" name="wand" value={newUser.wand} onChange={handleChange}>
                    <option value="">Select a wand</option>
                    <option>Phoenix Feather</option>
                    <option>Dragon Heartstring</option>
                    <option>Unicorn Hair</option>
                </select>

                <label htmlFor="owl">Name your Owl:</label>
                <input id="owl" type="text" name="owl" value={newUser.owl} placeholder="Name your owl" onChange={handleChange} />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SortingHat;