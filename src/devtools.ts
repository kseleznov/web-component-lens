import { ExtensionPanel } from "@/types/types";
import { inspectElement } from "@/utils/utils";

chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
  chrome.devtools.inspectedWindow.eval(`(${inspectElement})()`, (result) => {
    chrome.runtime.sendMessage({
      type: "ELEMENT_SELECTED",
      payload: result,
    })
  });
});

function createPanel() {
  return new Promise<ExtensionPanel>((result) => {
    chrome.devtools.panels.create("WC Lens", "", "./panel.html", (panel) => result(panel));
  });
}

createPanel();
