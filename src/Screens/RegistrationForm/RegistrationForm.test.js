import React from "react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import RegistrationForm from "./RegistrationForm";

// Mock axios post method
jest.mock("axios");

// Mock useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("RegistrationForm component", () => {
  // Test if the rendering of the component matches the snapshot
  if (
    ("renders correctly and matches snapshot",
    () => {
      const tree = renderer.create(<RegistrationForm />).toJSON();
      expect(tree).toMatchSnapshot();
    })
  );
});
