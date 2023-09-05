import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("display image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);
  //find Images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

// test("display image from option from server", async () => {
//   render(<Options optionType="toppings" />);
//   //find Images
//   const toppingImages = await screen.findAllByRole("img", {
//     name: /topping$/i,
//   });
//   expect(toppingImages).toHaveLength(3);

//   const altText = toppingImages.map((element) => element.alt);
//   expect(altText).toEqual(["Cherries", "M&Ms", "Hot fudge"]);
// });
