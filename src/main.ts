import * as core from "@actions/core";
import * as github from "@actions/github";

import { formatResult, lint } from "./lint";

(async function run() {
  const title = github.context.payload.pull_request?.title;
  const configFile = core.getInput("commitlintConfigFile");

  core.info(
    `🔎 Checking if the title of this PR "${title}" meets the requirements ...`
  );

  try {
    const lintResult = await lint(title, configFile);
    if (!lintResult.valid) {
      core.setFailed(`\n ${formatResult(lintResult)}`);
    } else {
      core.info("✔️ All good");
    }
  } catch (error) {
    core.setFailed(error as Error);
  }
})();
