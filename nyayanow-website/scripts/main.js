// scripts/main.js

export async function loadCases() {
  const res = await fetch("cases.json");
  if (!res.ok) throw new Error("Unable to load cases.json");
  return res.json();
}

export function setYear() {
  const span = document.getElementById("year");
  if (span) span.textContent = new Date().getFullYear();
}

setYear();
