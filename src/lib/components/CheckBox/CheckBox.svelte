<script lang="ts">
    import IconCheckSquareFill from "phosphor-icons-svelte/IconCheckSquareFill.svelte"
    import IconSquareRegular from "phosphor-icons-svelte/IconSquareRegular.svelte"
    import type { Snippet } from "svelte"
    import type { SvelteHTMLElements } from "svelte/elements"

    let {
        children,
        checked = $bindable(false),
        ...restProps
    }: SvelteHTMLElements["input"] & {
        children: Snippet
    } = $props()

    const id = $props.id()
</script>

<label class="inline-flex items-center gap-2" for={id}>
    <input
        class="peer hidden"
        type="checkbox"
        bind:checked
        {id}
        {...restProps}
    />
    <IconCheckSquareFill class="shrink-0 text-2xl peer-not-checked:hidden" />
    <IconSquareRegular class="shrink-0 text-2xl peer-checked:hidden" />
    <span>
        {@render children()}
    </span>
</label>
