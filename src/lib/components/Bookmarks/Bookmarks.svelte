<script lang="ts">
    import type { Bookmarks } from "$lib/utilities/bookmarks"
    import Bookmark from "./Bookmark.svelte"
    import { default as SelfComponent } from "./Bookmarks.svelte"

    let {
        bookmarks,
    }: {
        bookmarks: Bookmarks
    } = $props()
</script>

<ul class="space-y-2">
    {#each bookmarks as bookmark}
        <li class="group space-y-4">
            {#if bookmark.nsRoot && bookmark.children}
                <h3 class="group-not-first:mt-8!">{bookmark.title}</h3>
                <SelfComponent bookmarks={bookmark.children} />
            {:else}
                <Bookmark {bookmark} />
            {/if}
        </li>
    {/each}
</ul>
