export function inspectElement() {
  if (!$0) return { message: "No element selected." };

  const customElement = window.customElements.get($0.localName);

  if (!customElement) {
    return { message: "The selected element is not a custom element" };
  }

  let data;

  if ($0.properties) {
    data = $0.properties instanceof Map ? Object.fromEntries($0.properties) : $0.properties;
  } else if ($0.__data) {
    data = $0.__data;
  } else {
    return { message: "Is not Polymer or Lit component" };
  }

  const sortedByAlphabeticalOrder = Object.fromEntries(
    Object.entries(data).sort(([a], [b]) => a.localeCompare(b))
  );

  return sortedByAlphabeticalOrder;
}