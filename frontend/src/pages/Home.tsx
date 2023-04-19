import React, { useState } from 'react';
import FileUploader from '../components/FileUploader/FileUploader';
import Header from '../Layout/Header/Header';

const Home: React.FC = () => { //FC is a react functional component (not a normal function), which returns JSX

  return (
    <div>
      <Header />
      <FileUploader />
    </div>
  );
}

export default Home;