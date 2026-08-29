import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

/**
 * `expect.extend(matchers)` in happy-dom-setup.ts adds jest-dom's matchers
 * (toBeInTheDocument, toBeDisabled, ...) at runtime, but TypeScript has no way
 * to infer that from a function call — it still only knows about bun:test's
 * own built-in Matchers. This merges jest-dom's matcher types into bun:test's
 * `Matchers` interface so tsc (and your editor) recognize them too.
 */
declare module "bun:test" {
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Matchers<T = unknown>
    extends TestingLibraryMatchers<ReturnType<typeof expect.stringContaining>, T> {}
}
