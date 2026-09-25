import { siteConfig, type Weekday } from "@/data/site";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** "07" a partir de um índice iniciado em zero. */
export function ordinal(index: number) {
  return String(index + 1).padStart(2, "0");
}

/** Remove os marcadores de ênfase (*texto*) usados nos títulos. */
export function stripEmphasis(text: string) {
  return text.replace(/\*/g, "");
}

/** "5519998757670" → "(19) 99875-7670" */
export function formatPhone(digits: string) {
  const national = digits.startsWith("55") ? digits.slice(2) : digits;
  const areaCode = national.slice(0, 2);
  const number = national.slice(2);
  const split = number.length === 9 ? 5 : 4;
  return `(${areaCode}) ${number.slice(0, split)}-${number.slice(split)}`;
}

export const phoneDisplay = formatPhone(siteConfig.phone);
export const phoneHref = `tel:+${siteConfig.phone}`;

export function whatsappHref(message: string = siteConfig.whatsapp.message) {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

const { address } = siteConfig;

export const addressLines = [
  `${address.street}, ${address.number}`,
  address.neighborhood,
  `${address.city} — ${address.state}`,
  address.zipCode,
];

const mapsQuery = encodeURIComponent(
  `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}, ${address.zipCode}`,
);

export const mapsHref =
  siteConfig.googleBusinessUrl ?? `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
export const mapsEmbedSrc = `https://maps.google.com/maps?q=${mapsQuery}&z=16&output=embed`;

export const weekdays: { key: Weekday; label: string; schema: string }[] = [
  { key: "monday", label: "Segunda", schema: "Monday" },
  { key: "tuesday", label: "Terça", schema: "Tuesday" },
  { key: "wednesday", label: "Quarta", schema: "Wednesday" },
  { key: "thursday", label: "Quinta", schema: "Thursday" },
  { key: "friday", label: "Sexta", schema: "Friday" },
  { key: "saturday", label: "Sábado", schema: "Saturday" },
  { key: "sunday", label: "Domingo", schema: "Sunday" },
];

export type OpeningHoursRow = {
  key: Weekday;
  label: string;
  schema: string;
  opens: string | null;
  closes: string | null;
  display: string;
};

export function getOpeningHours(): OpeningHoursRow[] {
  return weekdays.map((day) => {
    const value = siteConfig.openingHours[day.key];
    if (value === "closed") {
      return { ...day, opens: null, closes: null, display: "Fechado" };
    }
    const [opens, closes] = value.split("-");
    return { ...day, opens, closes, display: `${opens} — ${closes}` };
  });
}

/** Resumo do horário, agrupando dias consecutivos: "Segunda a sexta, 09:00 — 18:00". */
export function openingHoursSummary() {
  const groups: { first: OpeningHoursRow; last: OpeningHoursRow; lastIndex: number }[] = [];

  getOpeningHours().forEach((row, index) => {
    if (!row.opens) return;
    const current = groups.at(-1);
    if (current && current.lastIndex === index - 1 && current.last.display === row.display) {
      current.last = row;
      current.lastIndex = index;
    } else {
      groups.push({ first: row, last: row, lastIndex: index });
    }
  });

  return groups
    .map(({ first, last }) => {
      const days = first.key === last.key ? first.label : `${first.label} a ${last.label.toLowerCase()}`;
      return `${days}, ${first.display}`;
    })
    .join(" · ");
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-09-25" → "25 de setembro de 2026" */
export function formatDate(isoDate: string) {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}
