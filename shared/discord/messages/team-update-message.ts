export const teamUpdateMessage = (team: string, joined: string[], left: string[]) =>
  [
    `Updates for team **${team}**:`,
    "```diff",
    ...joined.map((name) => `+ ${name}`),
    ...left.map((name) => `- ${name}`),
    "```",
  ].join("\n");
