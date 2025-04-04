<script lang="ts">
    import type { Bookmarks } from "$lib/utilities/bookmarks"
    import Bookmark from "./Bookmark.svelte"
    import { default as SelfComponent } from "./Bookmarks.svelte"

    let {
        bookmarks,
        indent = 0,
    }: {
        bookmarks: Bookmarks
        indent?: number
    } = $props()
</script>

<ul class="space-y-2">
    {#each bookmarks as bookmark}
        <li class="group space-y-2">
            {#if bookmark.nsRoot}
                <h3 class="group-not-first:mt-8!">{bookmark.title}</h3>
                {#if bookmark.children}
                    <SelfComponent bookmarks={bookmark.children} />
                {:else}
                    <p class="text-gray-500">No bookmarks found.</p>
                {/if}
            {:else if bookmark.type === "folder"}
                <details>
                    <summary class="list-none">
                        <Bookmark {bookmark} {indent} />
                    </summary>
                    <main class="mt-2">
                        {#if bookmark.children}
                            <SelfComponent
                                bookmarks={bookmark.children}
                                indent={indent + 1}
                            />
                        {:else}
                            <p class="text-gray-500">No bookmarks found.</p>
                        {/if}
                    </main>
                </details>
            {:else}
                <Bookmark {bookmark} {indent} />
            {/if}
        </li>
    {/each}
</ul>
