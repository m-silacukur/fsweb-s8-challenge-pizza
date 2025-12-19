import { Switch, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home.jsx";
import OrderForm from "./pages/OrderForm.jsx";
import Success from "./pages/Success.jsx";

export default function App() {
  const [orderResponse, setOrderResponse] = useState(null);

  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route
        path="/siparis"
        render={(routeProps) => (
          <OrderForm
            {...routeProps}
            setOrderResponse={setOrderResponse}
          />
        )}
      />

      <Route
        path="/onay"
        render={(routeProps) => (
          <Success
            {...routeProps}
            orderResponse={orderResponse}
          />
        )}
      />
    </Switch>
  );
}
