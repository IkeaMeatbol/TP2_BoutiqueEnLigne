import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ContextAuth } from "./Context/Auth";
import RoutePrive from "./Context/RoutePrive"
import "./App.css";
import { useState } from 'react';
import BarreDeNavigation from "./Pages/BarreDeNavigation";
import SignUp from './Pages/PageSignUp';
import LogIn from './Pages/PageLogIn';

function App() {
  const [authentification, setAuthentification] = useState(false);

  return (
    <ContextAuth.Provider value={{authentification, setAuthentification}}>
    <BarreDeNavigation />
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={"Page Acceuil"} exact />
          <Route path="*" element={"Tes perdu mon chum"} exact />
          <Route path="/SignUp" element={<SignUp />} exact /> 
          <Route path="/LogIn" element={<LogIn />} exact /> 
           {/* Exemple d'une page privee, le moyen du prof ne marchais pas vraiment */}
          <Route exact path='/RoutePrive' element={<RoutePrive/>}>
            <Route exact path='/RoutePrive' element={"Voici la route prive"}/>
          </Route>

        </Routes>
      </Container>
    </Router>
  </ContextAuth.Provider>
  );
}

export default App;
