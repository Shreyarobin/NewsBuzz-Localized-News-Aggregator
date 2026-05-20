import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import Register from "../register";

test("renders Register safely", () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );
});
