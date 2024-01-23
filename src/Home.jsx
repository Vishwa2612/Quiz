import React from "react";
import Header from './Home/Header.jsx';
import Template from './Home/Template.jsx';
import home from './images/homeimage.jpeg';
import UserFormsList from "./Home/UserFormsList.jsx";

const Home = () =>{
    return(
        <div style={{ 
            backgroundImage: `url(${home})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0,
            }}>
            <Header/>
            <Template/>
            <UserFormsList/>
        </div>
    )
};

export default Home;
