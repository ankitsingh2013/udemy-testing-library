import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("Order phases for Happy path", async () => {
  const user = userEvent.setup();
  //render app
  //destructure unmount from return value to use at the end of test
  const { unmount } = render(<App />);

  // add icecreams & toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);

  const mochiCheckbox = await screen.findByRole("checkbox", {
    name: "Mochi",
  });
  await user.click(mochiCheckbox);

  // find and click order button
  const orderSummaryButton = screen.getByRole("button", {
    name: /Order Sundae/i,
  });
  await user.click(orderSummaryButton);
  // check summary info based on the order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Topping: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  //check summary option items
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  //alternatively
  // const optionItems =screen.getAllByRole('listitem');
  // const optionItemsText = optionItems.map((item) => item.textContent)
  // expect(optionItemsText).toEqual(['1 Vanilla','2 Chocolate', 'Cherries'])

  // accept T&C and click button to confirm order
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /Confirm order/i,
  });
  await user.click(confirmOrderButton);

  // Expect Loading to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // confirm order number on confirmation page

  const thankyouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankyouHeader).toBeInTheDocument();

  //expect that the loading has been diappeared
  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // find & click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderButton);

  // check that scoops & toppings subtotals have been reset
  const scoopsTotal = await screen.findByText("Scoops Total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = await screen.findByText("Toppings Total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();

  // do we need to await anything to avoid test errors
});

test("Toppings header is not on summary page if no topping ordered", async () => {
  const user = userEvent.setup();

  render(<App />);
  //add icre cream scoops but no toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  //find & click order summary button
  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });
  await user.click(orderSummaryButton);

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole("heading", { name: /toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});

test("Toppings header is not on summary page if toppings ordered then removed", async () => {
  const user = userEvent.setup();
  render(<App />);
  //add icecream scoops
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  //add a toppings & confirm
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();

  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("1.50");

  //remove the toppings
  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).not.toBeChecked();
  expect(toppingsTotal).toHaveTextContent("0.00");

  //find & click the order summary button
  const orderSummaryButton = screen.getByRole("button", {
    name: /Order Sundae/i,
  });
  await user.click(orderSummaryButton);

  const toppingsHeading = screen.queryByRole("heading", {
    name: "Topping: $1.50",
  });

  expect(toppingsHeading).not.toBeInTheDocument();
});
