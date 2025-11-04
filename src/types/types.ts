export type ExtensionPanel = chrome.devtools.panels.ExtensionPanel;

export interface IMessage {
  type: string;
  payload: Record<string, any>;
}

export type TPropertiesProps = {
  name: string;
  properties: any;
  level?: number;
};
