import { render, screen } from "../../../test-utils/testing-utils-library";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("update scoops subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  //make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText("Scoops total : $", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  //update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  //update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings  subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  //make sure default topping total starts out at $0.00
  const toppingsSubtotal = screen.getByText("Toppings total : $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // add cherries & check subtotal
  const gummieCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(gummieCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  //add mms & check subtotal
  const mmCheckbox = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });

  //uncheck cherries & subtotal
  await user.click(mmCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  await user.click(gummieCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});
