import { getInput } from "@actions/core";
import commitlintFormat from "@commitlint/format";
import commitlintLint from "@commitlint/lint";
import commitlintLoad from "@commitlint/load";
import type { LintOutcome, ParserOptions } from "@commitlint/types";

/**
 * @param {string} message PR title or commit message
 * @param {string} configFile path to commitlint config file
 * @returns raw results from `@commitlint/lint()`
 */
export async function lint(
  message: string,
  configFile?: string
): Promise<LintOutcome> {
  const config = await commitlintLoad({}, { file: configFile });

  return commitlintLint(
    message,
    config.rules,
    config.parserPreset
      ? { parserOpts: config.parserPreset.parserOpts as ParserOptions }
      : {}
  );
}

/**
 *
 * @param {Object} lintResult raw results from `@commitlint/lint()`
 * @returns string with human-readable error message
 */
export function formatResult(lintResult: LintOutcome): string {
  const options: { helpUrl?: string } = {};
  const helpUrl = getInput("helpUrl", { required: false });
  if (helpUrl) {
    options.helpUrl = helpUrl;
  }

  return commitlintFormat(
    {
      results: [
        {
          warnings: lintResult.warnings,
          errors: lintResult.errors,
          input: lintResult.input,
        },
      ],
    },
    options
  );
}
