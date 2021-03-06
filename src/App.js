import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ContextAuth } from "./Context/Auth";
import RoutePrive from "./Context/RoutePrive"
import "./App.css";
import { useState } from "react";
import BarreDeNavigation from "./Pages/BarreDeNavigation";
import SignUp from './Pages/PageSignUp';
import LogIn from './Pages/PageLogIn';
import { PageProduits } from "./Pages/PageProduits";
import { PageAdmin } from './Pages/PageAdmin';
import { PageSupprimer } from './Pages/PageSupprimer';
import { PageAjouter } from './Pages/PageAjouter';
import { PageModifier } from './Pages/PageModifier';

function App() {
  const [authentification, setAuthentification] = useState();

  return (
    <ContextAuth.Provider value={{authentification, setAuthentification}}>
    <Router>
    <BarreDeNavigation />
      <Container>
        <Routes>
          <Route path="/" element={authentification} exact />
          <Route path="*" element={"Tes perdu mon chum"} exact />
          <Route path="/SignUp" element={<SignUp />} exact /> 
          <Route path="/LogIn" element={<LogIn />} exact /> 
          <Route path ="/Produits" element={<PageProduits />} exact />

           {/* Exemple d'une page privee, le moyen du prof ne marchais pas vraiment */}
          <Route exact path='/Admin' element={<RoutePrive/>}>
            <Route exact path='/Admin' element={<PageAdmin />}/>
            <Route exact path = "/Admin/supprimer/:id" element={<PageSupprimer />} />
            <Route exact path = "/Admin/ajouter" element={<PageAjouter />} />
            <Route exact path = "/Admin/modifier/:id" element={<PageModifier />} />
          </Route>

        </Routes>
      </Container>
    </Router>
  </ContextAuth.Provider>
  );
}

export default App;
