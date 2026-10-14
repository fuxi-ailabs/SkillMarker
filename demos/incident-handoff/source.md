---
name: incident-handoff
description: Prepare a factual incident handoff from supplied observations and investigation notes.
---

# Incident Handoff

## Scope

Read the supplied incident notes and describe the affected service and the observed impact. Use facts from the notes rather than assumptions about the system. State what is known and what remains uncertain. Do not claim that a service has recovered unless the supplied evidence supports that conclusion.

## Timeline

Arrange recorded events in chronological order when timestamps are available. Preserve the original timestamps and time zones. If an event has no recorded time, identify that gap without inventing a timestamp. Separate user reports from observations made by the investigation team so their sources remain clear.

## Investigation

Summarize the checks that have already been performed and their recorded results. Distinguish a suspected cause from a verified cause. Mention evidence that contradicts a hypothesis rather than hiding it. Do not describe a proposed check as completed or infer a successful result from the absence of an error message.

## Next Actions

List the remaining investigation tasks and identify an owner when the notes name one. Explain which questions each task is intended to answer. Keep proposed mitigations separate from actions that have already been taken. Do not execute commands, modify a service, or promise a recovery time while preparing this handoff.

## Delivery

Return a concise handoff containing the current impact, timeline, completed checks, and next actions. Preserve exact error messages and technical identifiers when quoting evidence. Check that the summary contains no unsupported claims. Highlight unresolved risks so the receiving teammate can continue the investigation with the available information.
