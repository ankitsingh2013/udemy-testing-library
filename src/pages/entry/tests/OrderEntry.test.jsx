import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-utils-library";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handle errors for scoops & topping routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
