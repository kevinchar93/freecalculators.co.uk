---
description: Read or update the "Free Calculators Site" Trello board via the Trello REST API — used for migrating/mirroring Backlog.md tasks.
argument-hint: <what you want to do with the Trello board>
---

## Credentials

Stored in `.env.trello-token` at the repo root (gitignored, never commit it):

```
TRELLO_API_KEY=...
TRELLO_TOKEN=...
TRELLO_SECRET=...   # unused for REST calls, only needed for OAuth1 signing
```

Load them before any call:

```bash
source .env.trello-token
```

Every request needs `key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}` as query params (not headers).

## Board

**Free Calculators Site** — created for mirroring this project's Backlog.md tasks.

- Board ID: `6aa4aa5ebba79269fe957fbf`
- URL: https://trello.com/b/OgxYbznN/free-calculators-site
- Lists:
  - To Do: `6aa4aa5ebba79269fe957fc5`
  - In Progress: `6aa4aa5ebba79269fe957fc6`
  - Done: `6aa4aa5ebba79269fe957fc7`

## Confirmed working calls

All verified live against `api.trello.com` (not just docs).

**List all boards**
```bash
curl -s "https://api.trello.com/1/members/me/boards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&fields=name,id,url"
```

**List the lists on a board**
```bash
curl -s "https://api.trello.com/1/boards/{boardId}/lists?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&fields=name,id"
```

**Create a board**
```bash
curl -s -X POST "https://api.trello.com/1/boards/?name=My%20Board%20Name&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}"
```

**Rename a list**
```bash
curl -s -X PUT "https://api.trello.com/1/lists/{listId}?name=New%20Name&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}"
```

**Create a card** (name/desc should be URL-encoded)
```bash
curl -s -X POST "https://api.trello.com/1/cards?idList={listId}&name={cardName}&desc={cardDescription}&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}"
```

**Move a card to a different list**
```bash
curl -s -X PUT "https://api.trello.com/1/cards/{cardId}?idList={newListId}&key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}"
```

**List cards on a board/list**
```bash
curl -s "https://api.trello.com/1/lists/{listId}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&fields=name,id,desc"
```

## Notes

- `developer.trello.com` (the docs site) is unreachable from this sandbox — DNS blocked. `api.trello.com` (the actual API host) works fine. Prefer testing live against the API over trying to fetch docs.
- Card status maps to list: Backlog.md's todo/in-progress/done statuses → To Do/In Progress/Done lists above.
- When migrating Backlog.md tasks, read them with `backlog task list --plain` or `--json`, then create one Trello card per task via the create-card call above.

## Input

$ARGUMENTS
