import { render, screen } from "@testing-library/react";
import InputURL from "../components/Input-urls";
import { copy } from "../copy/copy";

test("displays title", async () => {
  render(<InputURL copy={copy} />);

  await screen.findByText("URL input:");

  const p = screen.getByText("URL input:");
  expect(p).toBeInTheDocument();
  expect(p).toBeVisible();
});

test("displays text input", async () => {
  render(<InputURL copy={copy} />);

  await screen.findByRole("textbox");

  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
  expect(input).toBeVisible();
  expect(input.placeholder).toEqual("https://api.example.com/v1/?key=value");
});

//Arrange
//Act
//Assert
