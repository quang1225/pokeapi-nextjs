import type { CSSProperties } from "react";

type DataRowProps = {
  category: string;
  value: number | string;
  max?: number;
};

export function DataRow({ category, value, max }: DataRowProps) {
  const percentage =
    max !== undefined && typeof value === "number"
      ? `${(value / max) * 100}%`
      : undefined;

  return (
    <tr>
      <td className="category">{category}</td>
      <td className="stats-number">{value}</td>
      {max !== undefined && typeof value === "number" ? (
        <td className="range-slide">
          <div
            className="range-slide-fill"
            style={
              {
                "--precentage": percentage,
              } as CSSProperties
            }
          />
        </td>
      ) : null}
    </tr>
  );
}
