import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import { initializeDB } from "../Utils/ApiUtils";

const initializeDatabase = async () => {
  try {
    const response = await fetch(initializeDB , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

function Home() {
    initializeDatabase()
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default Home;
