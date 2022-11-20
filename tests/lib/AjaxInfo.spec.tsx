import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AjaxInfo } from "../../src/lib/AjaxInfo";
import { ResponseInfo } from "../../src/lib/@types";
import "@testing-library/jest-dom";

vi.mock("../../src/lib/Requests", () => {
  const useRequests = vi.fn(() => ({
    responses: fakeResponses,
  }));

  return { useRequests };
});

let fakeResponses: ResponseInfo[];

describe("AjaxInfo Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fakeResponses = [];
  });

  it("should show the ajax icon", () => {
    render(<AjaxInfo />);

    expect(screen.getByRole("img")).toHaveAttribute("alt", "Ajax Request Info");
  });

  it("should not show counter if no responses present", () => {
    render(<AjaxInfo />);

    expect(screen.queryByText("(")).not.toBeInTheDocument();
  });

  it("should show response counter in round brackets", () => {
    fakeResponses.push({
      error: false,
      url: "https://127.0.0.1:8000/list?try=3.8541189811751844",
      method: "GET",
      type: "some",
      status: 200,
      token: "abcdefg",
      profiler: "https://127.0.0.1:8000/_profiler/81d1ae",
    });

    render(<AjaxInfo />);

    expect(screen.getByText("(1)")).toBeInTheDocument();
  });
});
