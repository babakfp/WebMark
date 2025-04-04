<script lang="ts">
    import IconFolderSimpleFill from "phosphor-icons-svelte/IconFolderSimpleFill.svelte"
    import IconGlobeSimpleFill from "phosphor-icons-svelte/IconGlobeSimpleFill.svelte"
    import type { Bookmark } from "$lib/utilities/bookmarks"

    let {
        bookmark,
        indent = 0,
    }: {
        bookmark: Bookmark
        indent: number
    } = $props()
</script>

<div
    class="ml-[calc(var(--indent)*2rem)] flex h-12 items-center gap-2 border-2 border-gray-800 px-4"
    style:--indent={indent}
>
    {#if bookmark.type === "folder"}
        <IconFolderSimpleFill class="shrink-0" />
    {:else if bookmark.icon}
        <img
            class="aspect-square h-4 w-4"
            src={bookmark.icon}
            alt={bookmark.title}
        />
    {:else}
        <IconGlobeSimpleFill class="shrink-0" />
    {/if}
    <span class="line-clamp-1">{bookmark.title}</span>
</div>
