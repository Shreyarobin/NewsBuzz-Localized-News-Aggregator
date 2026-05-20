import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import Login from "../login";

test("renders Login safely", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
});
