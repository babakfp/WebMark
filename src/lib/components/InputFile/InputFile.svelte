<script lang="ts">
    import type { SvelteHTMLElements } from "svelte/elements"
    import { cn } from "$lib/utilities"

    let {
        files = $bindable(),
        ...restProps
    }: Omit<SvelteHTMLElements["input"], "type" | "id"> & {
        files?: FileList
    } = $props()

    const { class: className, ...restPropsWithoutClass } = restProps

    const id = $props.id()

    let fileName = $derived(files?.item(0)?.name)
</script>

<label
    class={cn(
        "line-clamp-1 flex h-12 items-center border-2 border-gray-800 px-4 active:translate-y-0.5",
        className,
    )}
    for={id}
>
    {#if fileName}
        <span class="font-mono">{fileName}</span>
    {:else}
        Choose file
    {/if}
    <input
        class="hidden"
        type="file"
        {id}
        {...restPropsWithoutClass}
        bind:files
    />
</label>
