<script lang="ts">
    import { default as parseBookmarks } from "node-bookmarks-parser"
    import { Button } from "$lib/components/Button"
    import { InputError } from "$lib/components/InputError"
    import { InputFile } from "$lib/components/InputFile"
    import { InputMessage } from "$lib/components/InputMessage"

    let bookmarks = $state<ReturnType<typeof parseBookmarks>>()

    let form: {
        status: "idle" | "importing" | "success" | "error"
        error?: string
        data: {
            files: {
                data?: FileList
                error?: string
            }
        }
    } = $state({
        status: "idle",
        data: {
            files: {},
        },
    })

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault()

        if (form.status === "importing") {
            return
        }

        form.status = "importing"
        form.error = ""

        Object.entries(form.data).forEach(([key, value]) => {
            value.error = ""
        })

        if (
            !(form.data.files.data instanceof FileList)
            || form.data.files.data.length === 0
        ) {
            form.data.files.error = "No file selected."
            form.status = "error"
            return
        }

        const file = Array.from(form.data.files.data)[0]

        if (!file.name.endsWith(".html")) {
            form.data.files.error = "File must be an HTML file."
            form.status = "error"
            return
        }

        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = (event) => {
            if (!event.target) {
                form.error = "File reader event target not found."
                form.status = "error"
                return
            }

            const content = event.target.result

            if (typeof content !== "string") {
                form.error = "File reader result not a string."
                form.status = "error"
                return
            }

            try {
                bookmarks = parseBookmarks(content)
                form.status = "success"
            } catch (error) {
                form.error = String(error)
                form.status = "error"
            }
        }
    }
</script>

<svelte:head>
    <title>WebMark</title>
</svelte:head>

<div class="container pt-4 pb-12">
    <form
        class="space-y-4"
        method="post"
        enctype="multipart/form-data"
        onsubmit={handleSubmit}
    >
        <div class="space-y-2">
            <InputFile bind:files={form.data.files.data} />
            {#if form.data.files.error}
                <InputError>
                    {form.data.files.error}
                </InputError>
            {/if}
        </div>
        <Button type="submit" disabled={form.status === "importing"}>
            {#if form.status === "importing"}
                Importing...
            {:else}
                Import
            {/if}
        </Button>
        {#if form.error}
            <InputError>
                {form.error}
            </InputError>
        {/if}
        {#if form.status === "success"}
            <InputMessage class="text-green-500">
                Imported successfully
            </InputMessage>
        {/if}
    </form>
</div>
