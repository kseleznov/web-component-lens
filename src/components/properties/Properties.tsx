import { useState } from "react";
import type { TPropertiesProps } from "@/types/types";
import styles from "./properties.module.css";

export function Properties({ name, properties, level = 0 }: TPropertiesProps) {
  const [expanded, setExpanded] = useState(false);
  const isObject = typeof properties === "object" && properties !== null && Object.keys(properties).length > 0;

  function formatValue(value: any) {
    return Array.isArray(value) ? `Array(${value.length})` : "{…}";
  }

  return (
    <div className={styles["object-view"]} style={{ marginLeft: `${level + 20}px` }}>
      <div
        className={styles["object-view-header"]}
        onClick={() => isObject && setExpanded(!expanded)}
      >
        <div>
          <span className={styles["object-view-name"]}>{name}:</span>
          <span className={styles["object-view-value"]}>
            {isObject ? formatValue(properties) : JSON.stringify(properties)}
          </span>
        </div>
        {isObject && <span className={styles["object-view-span"]}>{expanded ? "-" : "+"}</span>}
      </div>

      {expanded &&
        isObject &&
        Object.entries(properties).map(([childName, childValue]) => (
          <Properties key={childName} name={childName} properties={childValue} level={level + 1} />
        ))}
    </div>
  );
}
