import React from "react";
import Header from "./components/organisms/Header";
import Layout from "./components/templates/Layout";

function App() {
  return (
    <Layout>
      <Header>
        <h1 className="text-3xl">Header</h1>
      </Header>
      <main>
        <h1 className="text-3xl">Main</h1>
      </main>
    </Layout>
  );
}

export default App;
