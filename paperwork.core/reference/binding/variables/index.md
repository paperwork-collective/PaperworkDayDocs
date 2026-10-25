---
layout: default
title: Loop Variables
parent: Data Binding
parent_url: /paperwork.core/reference/binding/
grand_parent: Paperwork.Reference
grand_parent_url: /paperwork.core/reference/
has_children: true
has_toc: false
nav_order: 4
---

# Loop Variables
{: .no_toc }

Special values available inside a [`{{#each}}`](/paperwork.core/reference/binding/helpers/each) loop.

| Variable | Description |
|----------|-------------|
| [`@index`](at_index) | The zero-based position of the current item |
| [`@first`](at_first) | `true` for the first item |
| [`@last`](at_last) | `true` for the last item |
| [`@key`](at_key) | The key (or property name) of the current entry, or the index for a collection |

See also [this and .](/paperwork.core/reference/binding/navigation/this) for the current item itself.
