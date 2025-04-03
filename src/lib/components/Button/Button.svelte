<script lang="ts">
    import type { Snippet } from "svelte"
    import type { SvelteHTMLElements } from "svelte/elements"
    import { cn } from "$lib/utilities"

    let {
        children,
        ...restProps
    }: SvelteHTMLElements["button"] & {
        children: Snippet
    } = $props()

    const { class: className, type, ...restPropsWithoutClass } = restProps
</script>

<button
    class={cn(
        "border-2 border-gray-800 px-4 py-2 active:translate-y-0.5 disabled:pointer-events-none disabled:opacity-50",
        className,
    )}
    type={type || "button"}
    {...restPropsWithoutClass}
>
    {@render children()}
</button>
