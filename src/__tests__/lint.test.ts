import { formatResult, lint } from "../lint";

describe("lint.js", () => {
  describe("lint", () => {
    it("should detect a valid message", async () => {
      const result = await lint(
        "chore(valid-scope): valid subject (MPDI-1234)"
      );
      expect(result.valid).toBeTruthy();
    });

    it("should detect an invalid message", async () => {
      const result = await lint(
        "invalid commit message",
        "./src/__tests__/commitlint.config.js"
      );
      expect(result.valid).toBeFalsy();
    });
  });

  describe("formatResult", () => {
    it("should return empty string for valid lint result", async () => {
      const lintResult = await lint(
        "chore(valid-scope): valid subject (MPDI-1234)"
      );
      expect(formatResult(lintResult)).toBe("");
    });

    it("should return a human-readable error message for invalid lint result", async () => {
      const lintResult = await lint(
        "invalid commit message",
        "./src/__tests__/commitlint.config.js"
      );
      const formattedErrorMessage = formatResult(lintResult);
      expect(formattedErrorMessage).toMatch("subject may not be empty");
      expect(formattedErrorMessage).toMatch("type may not be empty");
      expect(formattedErrorMessage).toMatch("found 2 problems, 0 warnings");
    });
  });
});
