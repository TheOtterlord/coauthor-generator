export async function getParticipants({
  owner,
  repo,
  prNumber,
}: {
  owner: string;
  repo: string;
  prNumber: string;
}) {
  const res = await Promise.allSettled([
    fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/reviews`,
    ),
    fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}/comments`,
    ),
    fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${prNumber}/comments`,
    ),
  ]);

  let data = await Promise.all(
    res.map(async (d) => {
      if (d.status !== "fulfilled") {
        return;
      }
      const json = await d.value.json();
      return json;
    }),
  );

  data = data.flat().filter(Boolean);
  const allParticipants = data
    .filter((d) => d.user.type !== "Bot")
    .map(({ user }) => ({
      login: user.login as string,
      id: user.id as string,
    }));

  const uniqueParticipants = allParticipants.filter(
    (d, i) => allParticipants.findIndex((p) => p.id === d.id) === i,
  );

  return uniqueParticipants;
}

export function createCoauthorString(user: { login: string; id: string }) {
  return `Co-authored-by: ${user.login} <${user.id}+${user.login}@users.noreply.github.com>`;
}
