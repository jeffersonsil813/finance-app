export function sortLabelsWithOtherLast<
  T extends { value: string; label: string },
>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    if (a.value === "OTHER") return 1;
    if (b.value === "OTHER") return -1;
    return a.label.localeCompare(b.label);
  });
}
