import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import Store from "./utils/Store"

const AppLayout = () => {
  return (
    <Provider store={Store}>
      <React.Fragment>
        <Header />
        <Body />
        <Footer />
      </React.Fragment>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
