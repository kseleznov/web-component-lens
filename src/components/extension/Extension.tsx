import { useEffect, useState } from "react";
import { Properties } from "@/components/properties/Properties";
import type { IMessage } from "@/types/types";
import styles from "./extension.module.css";

export function Extension() {
  const [properties, setProperties] = useState<IMessage["payload"]>([]);

  useEffect(() => {
    const listener = (message: IMessage) => {
      if (message.type === "ELEMENT_SELECTED") {
        setProperties(message.payload);
      }
    };

    chrome.runtime.onMessage.addListener(listener);

    return () => chrome.runtime.onMessage.removeListener(listener);
  }, []);

  return (
    <div className={styles["extension"]}>
      {Object.keys(properties).length > 0 ? (
        <Properties name="properties" properties={properties} level={0} />
      ) : (
        <Properties name="message" properties="Select an element from Elements tab" level={0} />
      )}
    </div>
  );
}
