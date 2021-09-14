import { isEven } from "./math";

describe("isEven", () => {
  it("should return true if we given even num", () => {
    const result = isEven(2);
    expect(result).toEqual(true);
  });

  it("should return false if we given odd num", () => {
    const result = isEven(1);
    expect(result).toEqual(false);
  });
});
