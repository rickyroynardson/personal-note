import React from "react";
import Header from "./components/organisms/Header";
import Layout from "./components/templates/Layout";
import HeaderBrand from "./components/atoms/HeaderBrand";

function App() {
  return (
    <Layout>
      <Header>
        <HeaderBrand />
      </Header>
      <main>
        <h1 className="text-3xl">Main</h1>
      </main>
    </Layout>
  );
}

export default App;
