<script lang="ts">
    import type { Snippet } from "svelte"
    import type { SvelteHTMLElements } from "svelte/elements"
    import { InputMessage } from "$lib/components/InputMessage"
    import { cn } from "$lib/utilities"

    let {
        children,
        ...restProps
    }: SvelteHTMLElements["p"] & {
        children: Snippet
    } = $props()

    const { class: className, ...restPropsWithoutClass } = restProps
</script>

<InputMessage class={cn("text-red-500", className)} {...restPropsWithoutClass}>
    {@render children()}
</InputMessage>
