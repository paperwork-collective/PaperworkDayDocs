---
layout: default
render_with_liquid: false
title: Installing
parent: Paperwork.Skill
parent_url: /paperwork.skill/
nav_order: 1
has_children: false
has_toc: false
---
# Installing the skill
{: .no_toc }

Install the [Paperwork CLI](/paperwork.cli/) first:

```bash
dotnet tool install -g Paperwork.CLI
paperwork info
```

Then add the skill to your agent.

## Claude Code

From the marketplace, which is the easiest way:

```text
/plugin marketplace add https://github.com/paperwork-collective/Paperwork.Skill
/plugin install paperwork
```

Or clone it and point Claude Code at the folder:

```bash
git clone https://github.com/paperwork-collective/Paperwork.Skill
claude --plugin-dir ./Paperwork.Skill
```

Or keep it for a project, by adding it to `.claude/settings.json`:

```json
{
  "plugins": {
    "paperwork": {
      "source": {
        "source": "github",
        "repo": "paperwork-collective/Paperwork.Skill"
      }
    }
  }
}
```

## Cursor

```bash
git clone --depth 1 https://github.com/paperwork-collective/Paperwork.Skill /tmp/Paperwork.Skill
mkdir -p ~/.cursor/skills
cp -r /tmp/Paperwork.Skill/skills/paperwork ~/.cursor/skills/paperwork
rm -rf /tmp/Paperwork.Skill
```

## GitHub Copilot in VS Code

1. Create `.github/copilot-instructions.md` in your repository.
2. Paste in the contents of `skills/paperwork/SKILL.md`.

## Windsurf

1. Create `.windsurf/rules/paperwork.md`.
2. Paste in the body of `skills/paperwork/SKILL.md`, everything after the `---` front matter at the top.

## Any other agent

`SKILL.md` is plain Markdown. Paste it into your agent's system prompt or custom instructions.
