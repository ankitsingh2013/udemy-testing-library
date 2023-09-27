import {render, screen} from '../../../test-utils/testing-utils-library'
import userEvent from '@testing-library/user-event'
import ScoopOption from '../ScoopOption';

test("input goes negative then input changed to red", async () => {
    const user = userEvent.setup();
    render(<ScoopOption />)

    //expect input to be invalid with negative number 
    const vanillaInput = await screen.getByRole("spinbutton");
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "-1");
    screen.debug(vanillaInput)
    expect(vanillaInput).toHaveClass("is-invalid")

    //replace with decimal input
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "2.5");
    expect(vanillaInput).toHaveClass("is-invalid")

    //replace with input that's too high
    await user.clear(vanillaInput)
    await user.type(vanillaInput, "11")
    expect(vanillaInput).toHaveClass("is-invalid"); 

    //replace with valid input
    await user.clear(vanillaInput)
    await user.type(vanillaInput,"3")
    expect(vanillaInput).not.toHaveClass("is-invalid")
})