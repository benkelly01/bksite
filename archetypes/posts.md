---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date | time.Format "2006-01-02" }}
description: "One or two sentences summarising the post. Used for previews and meta tags."
tags: ["tag-one", "tag-two"]
draft: true
---

Opening paragraph. State the problem or question in plain terms and why it matters.

Second paragraph. Say what approach you take and what the reader will have by the end.

![Alt text describing the diagram](/images/diagram-name.svg)

## First section

Explain the first step or concept. Keep paragraphs short.

```bash
# Example command or code
```

## Second section

Continue the walkthrough. Each heading should be one distinct idea.

```hcl
# Example code block
```

## Gotchas

Anything that tripped you up, or that the reader is likely to hit.

## Wrapping up

Recap in two or three sentences. What was built, the key decision, and the tradeoff.
