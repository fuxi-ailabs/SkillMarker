"use strict";
const byId = (id) => document.getElementById(id);
let examples = [];
let current;

function showPassage() {
  const passage = current.passages[Number(byId("passage").value)];
  byId("source-text").textContent = passage.source;
  const output = byId("candidate-text");
  output.replaceChildren();
  for (const segment of passage.segments) {
    const node = document.createElement(segment.changed && byId("highlight").checked ? "mark" : "span");
    node.textContent = segment.text;
    output.append(node);
  }
  byId("source-text").scrollTop = output.scrollTop = 0;
}

function selectExample(id) {
  current = examples.find((example) => example.id === id);
  for (const button of document.querySelectorAll("[data-example]")) {
    button.setAttribute("aria-pressed", String(button.dataset.example === id));
  }
  const select = byId("passage");
  select.replaceChildren();
  current.passages.forEach((passage, index) => select.add(new Option(passage.title, String(index))));
  select.value = String(current.initial);
  showPassage();
  const before = current.evidence.source_score.full;
  const after = current.evidence.candidate_score.full;
  const rows = [
    ["Green-token fraction", ...[before, after].map(s => (s.green_fraction * 100).toFixed(2) + "%")],
    ["Signal z", ...[before, after].map(s => s.z.toFixed(3))],
    ["Nominal p-value", ...[before, after].map(s => s.nominal_p_value < .001 ? s.nominal_p_value.toExponential(2) : s.nominal_p_value.toFixed(3))],
    ["Scored tokens", before.scored_tokens, after.scored_tokens],
    ["Detected (α = 0.01)", before.detected ? "Yes" : "No", after.detected ? "Yes" : "No"]
  ];
  byId("scores").replaceChildren();
  for (const values of rows) {
    const row = document.createElement("tr");
    values.forEach((value, index) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      if (index === 2) cell.className = "positive";
      row.append(cell);
    });
    byId("scores").append(row);
  }
  for (const [name, score] of [["original", before], ["candidate", after]]) {
    byId(`${name}-bar`).style.width = `${score.green_fraction * 100}%`;
    byId(`${name}-fraction`).textContent = `${(score.green_fraction * 100).toFixed(2)}%`;
  }
  for (const [element, file] of [["source-download", "source.md"], ["candidate-download", "candidate.md"], ["evidence-download", "evidence.json"]]) {
    byId(element).href = `demos/${current.id}/${file}`;
    byId(element).download = `${current.id}-${file}`;
  }
  const settings = current.evidence.settings;
  byId("configuration").textContent = `Recorded configuration: ${current.evidence.model}; ${settings.beams} beams; gamma ${settings.gamma}; delta ${settings.delta}; seed ${settings.seed}; CUDA scoring. Full-document scores are computed from the saved, re-tokenized text.`;
  byId("demo-status").textContent = `${current.title} · ${current.description}`;
}

byId("passage").addEventListener("change", showPassage);
byId("highlight").addEventListener("change", showPassage);
for (const button of document.querySelectorAll("[data-example]")) {
  button.addEventListener("click", () => selectExample(button.dataset.example));
}

fetch("assets/demos.json")
  .then(response => { if (!response.ok) throw new Error("Example data unavailable"); return response.json(); })
  .then(data => {
    examples = data;
    selectExample("meeting-brief");
    byId("demo-content").hidden = false;
    for (const button of document.querySelectorAll("[data-example]")) button.disabled = false;
  })
  .catch(() => {
    byId("demo-status").textContent = "The interactive examples could not load. You can still open the saved files: ";
    for (const id of ["meeting-brief", "incident-handoff"]) {
      const link = document.createElement("a");
      link.href = `demos/${id}/candidate.md`;
      link.textContent = id + " ";
      byId("demo-status").append(link);
    }
  });

byId("copy-citation").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(byId("citation-text").textContent);
    byId("copy-status").textContent = "BibTeX copied to clipboard.";
  } catch {
    const range = document.createRange();
    range.selectNodeContents(byId("citation-text"));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    byId("copy-status").textContent = "Citation selected. Press Ctrl+C or Command+C to copy.";
  }
});
