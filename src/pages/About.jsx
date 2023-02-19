import React from 'react';
import { Link, Outlet, Route, Routes } from 'react-router-dom';

const About = () => {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>About this App</h1>
            <p>This is a demo website for React tests</p>
            <ul>
                <li><Link to="contacts" >Our Contacts</Link> </li>
                <li><Link to="team" >Our Team</Link> </li>
            </ul>

            <Routes>
                <Route path='contacts' element={<p>Our contacts</p>} />
                <Route path='team' element={<p>Our team</p>} />
            </Routes>

            <Outlet/>
        </div>
    );
};

export default About;
