import { useState } from "react";
import type { TPropertiesProps } from "@/types/types";
import styles from "./properties.module.css";

export function Properties({ name, properties, level = 0 }: TPropertiesProps) {
  const [expanded, setExpanded] = useState(false);
  const isObject = typeof properties === "object" && properties !== null && Object.keys(properties).length > 0;

  function formatValue(value: any) {
    if (Array.isArray(value)) {
      return `Array(${value.length}) [${value.slice(0, 3).map(v => JSON.stringify(v)).join(", ")}${value.length > 3 ? ", …" : ""}]`;
    }
  
    if (typeof value === "object" && value !== null) {
      const keys = Object.keys(value);
      const preview = keys.slice(0, 3).map(key => key + ": " + JSON.stringify(value[key]));

      return `{${preview.join(", ")}${keys.length > 3 ? ", …" : ""}}`;
    }
  
    return JSON.stringify(value);
  }

  return (
    <div className={styles["object-view"]} style={{ marginLeft: `${level + 20}px` }}>
      <div
        className={styles["object-view-header"]}
        onClick={() => isObject && setExpanded(!expanded)}
      >
        {isObject && <div className={styles["object-view-span"]}>{expanded ? "-" : "+"}</div>}
        <div className={styles["object-view-name"]}>{name}:</div>
        <div className={styles["object-view-value"]}>{isObject ? formatValue(properties) : JSON.stringify(properties)}</div>
      </div>

      {expanded &&
        isObject &&
        Object.entries(properties).map(([childName, childValue]) => (
          <Properties key={childName} name={childName} properties={childValue} level={level + 1} />
        ))}
    </div>
  );
}
