import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();

  // disable order button if there arn't any scoops in order
  const orderDisabled = totals.scoops === 0;

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <Button
        type="button"
        className="btn btn-primary"
        onClick={() => setOrderPhase("review")}
        disabled={orderDisabled}
      >
        Order Sundae!
      </Button>
    </div>
  );
}
