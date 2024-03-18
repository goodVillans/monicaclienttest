import React from "react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import LoginForm from "./LoginForm";

// Mocking modules
jest.mock("axios");
jest.mock("react-router-dom", () => ({
  // Import and spread the original module
  ...jest.requireActual("react-router-dom"),
  // Mock useNavigate hook
  useNavigate: () => jest.fn(),
}));

describe("LoginForm", () => {
  // Test if the rendering of the component matches the snapshot
  if (
    ("renders correctly and matches snapshot",
    () => {
      const tree = renderer.create(<LoginForm />).toJSON();
      expect(container).toMatchSnapshot();
    })
  );
});
