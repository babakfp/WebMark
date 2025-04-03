<script lang="ts">
    import type { Snippet } from "svelte"
    import type { SvelteHTMLElements } from "svelte/elements"
    import { cn } from "$lib/utilities"

    let {
        children,
        ...restProps
    }: SvelteHTMLElements["p"] & {
        children: Snippet
    } = $props()

    const { class: className, ...restPropsWithoutClass } = restProps
</script>

<p class={cn("text-sm text-gray-600", className)} {...restPropsWithoutClass}>
    {@render children()}
</p>
