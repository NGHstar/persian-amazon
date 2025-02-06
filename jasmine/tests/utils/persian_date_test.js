import { persianDate } from "../../../js/utils/persian_date.js";

// test unit
describe("test suite: persian date add days", () => {
  // single test
  it("try negative number", () => {
    expect(persianDate(-1)).toEqual("چهارشنبه ۱۷ بهمن");
  });
  // single test
  it("try zero", () => {
    expect(persianDate(-50000000));
  });
});

// we can also use describe inside another describe
