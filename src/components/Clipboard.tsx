import { For, Show } from "solid-js";
import { store } from "~/scripts/store";
import { createCoauthorString } from "~/scripts/utils";

export function Clipboard() {
  return (
    <pre class="bg-gray-200 border border-gray-300 p-4 w-full max-w-2xl mt-8 font-mono overflow-scroll rounded-md">
      <Show
        when={store.participants.length > 0}
        fallback="Enter a GitHub pull request url to get your co-authors"
      >
        <For each={store.participants}>
          {(participant) => (
            <p>
              {createCoauthorString({
                login: participant.login,
                id: participant.id,
              })}
            </p>
          )}
        </For>
      </Show>
    </pre>
  );
}
