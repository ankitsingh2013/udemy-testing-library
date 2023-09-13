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
