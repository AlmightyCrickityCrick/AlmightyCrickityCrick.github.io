import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewPage from "../NewPage/NewPage";
import PopularPage from "../PopularPage/PopularPage";
import BestPage from "../BestPage/BestPage";
import WorstPage from "../WorstPage/WorstPage";
import Movie from "../Movie/Movie";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Search from "../Search/Search";

import Home from "../Home/Home";
import About from "../About/About";

function App() {
  return (
    <Router>
      <div className="app">
        <Header
          logo="https://scontent.fotp1-1.fna.fbcdn.net/v/t1.15752-9/69137705_722081421549140_811317539802972160_n.png?_nc_cat=111&_nc_oc=AQl1V_tkyGPT_bsjB2BpDQtDrlNcfft3j-rihox8H8Vy80HKC3aEMiLEhVdx9mqW-8w&_nc_ht=scontent.fotp1-1.fna&oh=8284ff6750611107014182a7b8f77ef7&oe=5DD8A107"
          menu={[
            { link: "/popular/1", title: "Popular" },
            { link: "/new/1", title: "New" },
            { link: "/search", title: "Search" },
          ]}></Header>
        <div className="app-content">
          <Route exact path="/" component={Home}></Route>
          <Route path="/about" exact component={About}></Route>
          <Route path="/new/:id" exact component={NewPage}></Route>
          <Route path="/popular/:id" exact component={PopularPage}></Route>
          <Route path="/best_rated/:id" exact component={BestPage}></Route>
          <Route path="/worst_rated/:id" exact component={WorstPage}></Route>
          <Route path="/search" exact component={Search}></Route>
          <Route path="/movie/:id" exact component={Movie}></Route>
        </div>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
