import { useEffect } from "react";
import Body from "./Components/Body"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import './App.css'
// import useStore from './zustand/store'; // Adjust the path based on your project structure


function App() {
  // const { isLogged } = useStore();

  // useEffect(() => {
  //   console.log('isLogged value changed:', isLogged);
  // }, [isLogged]);


  return (
    <div>
      <Header/>
      <Body/>
      <Footer/>
    </div>
  )
}

export default App
