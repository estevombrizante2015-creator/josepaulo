import { cn, getOpeningHours } from "@/lib/utils";

/** Horário de atendimento — editável em src/data/site.ts (arquitetura.md §30). */
export function OpeningHours({ className }: { className?: string }) {
  return (
    <table className={cn("w-full text-sm", className)}>
      <caption className="sr-only">Horário de atendimento</caption>
      <tbody>
        {getOpeningHours().map((row) => (
          <tr key={row.key} className="border-b border-line last:border-b-0">
            <th scope="row" className="py-2.5 text-left font-normal text-fg-muted">
              {row.label}
            </th>
            <td className={cn("py-2.5 text-right tabular-nums", row.opens ? "text-fg" : "text-fg-muted")}>
              {row.display}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
