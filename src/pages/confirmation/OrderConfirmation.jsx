import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Button } from "react-bootstrap";

export default function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    axios
      .post(`https://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => {
        //TODO :  handle error
      });
  }, []);

  function handleClick() {
    // clear the order details
    resetOrder();

    //send back to order page
    setOrderPhase("inProgress");
  }
  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank you!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          As per our terms & condition, nothing will happpen now.
        </p>
        <Button onClick={handleClick}>Create New order</Button>
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
