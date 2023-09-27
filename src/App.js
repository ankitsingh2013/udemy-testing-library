import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderSummary from "./pages/summary/OrderSummary";
import { useState } from "react";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
  //orderPhase need to be "Inprogress", "Review" and completed
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry; //defaults to order page
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }
  return (
    <OrderDetailsProvider>
      <Container>
        {<Component setOrderPhase={setOrderPhase} />}
      </Container>
    </OrderDetailsProvider>
  );
}

export default App;
