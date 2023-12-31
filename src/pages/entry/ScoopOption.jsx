import Col from "react-bootstrap/Col";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Form, Row } from "react-bootstrap";
import { useState } from "react";

export default function ScoopOptions({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const [isValid, setIsValid] = useState(true);

/*  const handleChange = (e) => {
    //updateItemCount(name, parseInt(e.target.value), "scoops");
    const currentValue = e.target.value;
    const currentValueFloat = parseFloat(currentValue)

    const valueIsValid = 
    0 <= currentValueFloat && 
    currentValueFloat <= 10 && 
    Math.floor(currentValueFloat) === Math.floor(currentValueFloat) 

    setIsValid(valueIsValid)
    //update scoop count to 0 if value is invalid
    const newValue = valueIsValid ? parseInt(currentValue) : 0;

    updateItemCount(name, newValue, "scoops");  
  }
    */
  const handleChange = (event) => {
    const currentValue = event.target.value;
    // make sure we're using a number and not a string to validate
    const currentValueFloat = parseFloat(currentValue);
    const valueIsValid =
      0 <= currentValueFloat &&
      currentValueFloat <= 10 &&
      Math.floor(currentValueFloat) === currentValueFloat;

    // validate
    setIsValid(valueIsValid);

    // only update context if the value is valid
    //if (valueIsValid) updateItemCount(name, parseInt(currentValue), "scoops");
    if (valueIsValid) {
      updateItemCount(name, currentValue, "scoops");
    } else {
      updateItemCount(name, 0, "scoops");
    }
  };

  //console.log(name, imagePath);
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}--count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
}
