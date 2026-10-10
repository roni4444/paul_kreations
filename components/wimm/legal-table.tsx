import type { ReactNode } from "react";

// components/wimm/legal-table.tsx
// A real <table> that stacks into labelled cards on phones. Header cells are
// hidden visually on small screens (still announced), and each cell carries a
// data-label that is shown above its value. Explicit ARIA roles keep table
// semantics when the layout switches to display:block.

const MONO = "font-[family-name:var(--font-jetbrains-mono)] tracking-[0.05em]";

type LegalTableProps = {
  caption: string;
  columns: string[];
  rows: ReactNode[][];
};

export function LegalTable({ caption, columns, rows }: LegalTableProps) {
  return (
    <table
      role="table"
      className="w-full border-collapse text-[0.9375rem] max-md:block"
    >
      <caption className="sr-only">{caption}</caption>
      <thead role="rowgroup" className="max-md:sr-only">
        <tr role="row">
          {columns.map((column) => (
            <th
              key={column}
              role="columnheader"
              scope="col"
              className={`${MONO} border border-[#D8E8E0] bg-[#EEF5F1] px-3 py-2.5 text-left text-[11px] font-medium text-[#0E2A20] uppercase`}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody role="rowgroup" className="max-md:block">
        {rows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            role="row"
            className="max-md:mb-3 max-md:block max-md:border max-md:border-[#D8E8E0] max-md:bg-white"
          >
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                role="cell"
                data-label={columns[cellIndex]}
                className={`border-[#D8E8E0] before:font-[family-name:var(--font-jetbrains-mono)] align-top before:mb-0.5 before:block before:text-[10px] before:text-[#7C9187] before:uppercase before:content-[attr(data-label)] max-md:block max-md:px-3 max-md:py-2 md:table-cell md:border md:px-3 md:py-2.5 md:before:hidden`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
