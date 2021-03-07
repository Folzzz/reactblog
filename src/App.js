import React from 'react';
import { useSelector } from 'react-redux';
import Blogs from './Components/Blogs';
import HomePage from './Components/HomePage';
import NavBar from './Components/NavBar';
import { selectSignedIn } from './Features/userSlice';

import "./styling/app.css"

function App() {
  const isSignedIn = useSelector(selectSignedIn)

  return (
    <div>
      <NavBar />
      <HomePage />
      {
        isSignedIn &&  <Blogs />
      }
    </div>
  );
}

export default App;
