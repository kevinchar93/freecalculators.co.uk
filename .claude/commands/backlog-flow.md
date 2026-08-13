---
description: Spec-driven Backlog.md loop — decompose an idea into tasks, or plan/implement one task, stopping at each human review checkpoint.
argument-hint: <an idea to decompose> | <TASK-ID to work on>
---

You are working in a repository that uses **Backlog.md** for spec-driven AI development.
Follow the loop below. **Always stop and wait for my review at each checkpoint — never
run past one on your own.**

**First, always run `backlog instructions overview`** to load the current workflow, then
read the matching detailed guide before any lifecycle action:
- `backlog instructions task-creation` before creating or splitting tasks
- `backlog instructions task-execution` before planning, changing status/assignee, adding a plan or implementation notes, or implementing
- `backlog instructions task-finalization` before checking acceptance criteria, writing summaries, or moving tasks to a terminal status

Never edit task/draft/doc/decision/milestone markdown directly — always use the `backlog` CLI.

## Input

$ARGUMENTS

Decide which entry point applies:
- If the input describes **an idea or feature** → start at **Step 1 (Decompose)**.
- If the input is **a task ID** (e.g. `TASK-0011`, `BACK-10`) → start at **Step 3 (Plan)**.
- If the input is **empty**, ask me what I want to build or which task to work on.

---

### Step 1 — Decompose (only when given an idea)
Split the idea into **small, independent Backlog.md tasks**, each with a clear description
and testable acceptance criteria. Size each task so one agent session can finish it in a
single conversation without running out of context, and so tasks don't conflict (one task
→ one PR). Create the tasks via the `backlog` CLI.
When performing this decomposition, create a local markdown file with a generated name where you can put the decomposition for input from the programmer on it. This is easier to read in comparison to the chat window. Reference it as you continue to decompose the idea and take their input. 

🛑 **Checkpoint #1** — Stop. Present the task list and ask me to review the descriptions and
acceptance criteria before going further. Do not start planning or coding.

### Step 2 — Pick one task
Work on **a single task per session**. If a specific task wasn't named, recommend which one
to start with and confirm with me. Set its status appropriately via the CLI.

### Step 3 — Plan before coding
For the chosen task only: **research the current codebase** and write an implementation plan
into the task (via the CLI). Do the research now so the plan reflects the code as it actually
is today.

🛑 **Checkpoint #2** — Stop. Present the plan and wait for my explicit approval. Do not write
any implementation code until I approve. If I ask for changes, revise the plan and re-present.

### Step 4 — Implement and verify
After approval, implement the task - first focus on only implementation so we don't burn tokens on rewriting tests if things change.

🛑 **Checkpoint #2.1** — Stop - summarize the implementation so far. Get the programmer to review it & implement any suggested changes, keep doing this un the until they confirm you can move on to the verification.

Write & run the tests, linting, and typecheck, and confirm the
result matches the acceptance criteria. Add brief implementation notes to the task via the CLI.

Do not get into a verification loop where you run tasks again and again and again trying to verify something simple. If you get issues more than twice, stop and ask for input.

🛑 **Checkpoint #3** — Stop. Summarize what you did and how you verified it (tests/lint/results),
and hand back to me to review the code before finalizing.

---

**If the output isn't good enough:** don't patch endlessly. Clear the task's plan / notes /
final summary, help me refine the description and acceptance criteria, and re-run the task in
a fresh session.