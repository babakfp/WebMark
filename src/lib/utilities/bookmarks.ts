import { default as parseFn } from "node-bookmarks-parser"

export const parse = parseFn

export type Bookmarks = ReturnType<typeof parseFn>
export type Bookmark = ReturnType<typeof parseFn>[number]
