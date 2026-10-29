# Context and Instructions for Gemini in this Worktree

You are working in an isolated git worktree on branch `feat/motion-tokens`.

## Primary Objective
Implement the Motion Tokens Studio and bilingual case study task-by-task according to the authoritative implementation plan:
- **Implementation Plan:** `docs/superpowers/plans/2026-10-29-motion-tokens-studio.md`
- **Design Specification:** `docs/superpowers/specs/2026-10-29-motion-tokens-studio-design.md`

## Key Rules
1. **Never use em dashes** (voice_principles Rule 25). Use colons, parentheses, or separate sentences instead.
2. **Execute tasks strictly one by one:** Task 1 through Task 8.
3. **Commit after each task** after verifying `npm test` and `npm run build` both exit with code 0.
4. **Do not modify existing case studies:** Keep Portfolio Desk, Kraków Touristification, and PetCare code untouched.
5. **Use available MCP tools for Task 7:**
   - Figma MCP (`figma_figma`): Create file with `create_new_file` under plan `team::1624891726134606124` ("Portfolio").
   - Notion MCP (`notion_notion`): Sync spec to "Grzegorz Seweryn’s Space".
6. **Responsive check:** Ensure 320px width has zero horizontal overflow.
