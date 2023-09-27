import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-utils-library";
import Options from "../Options";

test("display image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);
  //find Images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display image for each toppings option from server", async () => {
  render(<Options optionType="toppings" />);
  //find Images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  //check the actual alt text for the images
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("don't update total if scoop input is invalid", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // wait for the vanilla input to appear after server call
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla"
  });

  //find the scoops subtotals which starts out at 0
  const scoopsSubtotal = screen.getByText("Scoops total : $0.00")

  //clear the input 
  await user.clear(vanillaInput);
  
  //type the input
  await user.type(vanillaInput, "2.5")

  expect(scoopsSubtotal).toHaveTextContent("$0.00")

  //do the same test for "100"
  await user.clear(vanillaInput)
  await user.type(vanillaInput, "100")
  expect(scoopsSubtotal).toHaveTextContent("$0.00")

  //do the same test for "-1"
  await user.clear(vanillaInput)
  await user.type(vanillaInput, "-1")
  expect(scoopsSubtotal).toHaveTextContent("$0.00")
})