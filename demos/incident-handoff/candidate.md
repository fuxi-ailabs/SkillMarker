---
name: incident-handoff
description: Prepare a factual incident handoff from supplied observations and investigation notes.
---

# Incident Handoff

## Scope

Read the provided incident notes and identify the service that was affected, as well as the observed impact. Base your description solely on the facts presented in the notes and avoid making assumptions about the underlying system. Clearly state what is known and what remains uncertain. Do not assert that a service has recovered unless there is explicit supporting evidence in the notes.

## Timeline

Arrange recorded events in chronological sequence whenever timestamps are provided. Maintain the original timestamps and their associated time zones. For events lacking a recorded time, note the absence without fabricating a timestamp. Distinguish between user reports and observations documented by the investigation team to ensure the clarity of their respective sources.

## Investigation

Summarize the checks that have been carried out and the outcomes that have been recorded. Clearly differentiate between a potential cause that is under suspicion and one that has been confirmed. Include any evidence that refutes a hypothesis rather than omitting it. Do not describe a planned check as completed or assume a successful outcome based on the lack of an error message.

## Next Actions

List any remaining investigation tasks and assign an owner if the notes specify one. For each task, clarify the specific questions it is meant to address. Separate proposed mitigations from actions that have already been completed. Do not execute commands, modify a service, or promise a recovery time while preparing this handoff.

## Delivery

Return a concise handoff that includes the current impact, timeline, completed checks, and next actions. Maintain exact error messages and technical identifiers when referencing evidence. Ensure the summary contains no unsupported claims. Clearly highlight any unresolved risks so the receiving teammate can proceed with the investigation using the available information.
