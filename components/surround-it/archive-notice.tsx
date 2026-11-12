import Link from "next/link";

// components/surround-it/archive-notice.tsx
// Banner shown at the top of an archived (superseded) legal page. The archived
// text itself is kept verbatim below it as a record of what applied earlier.

type ArchiveNoticeProps = {
  document: "Privacy Policy" | "Terms of Service";
  currentHref: string;
  supersededOn: string;
  note: string;
};

export function ArchiveNotice({
  document,
  currentHref,
  supersededOn,
  note,
}: ArchiveNoticeProps) {
  return (
    <aside
      aria-label="Archived version"
      className="border border-[#5C4E1F] bg-[#241F0D] px-4 py-3 text-sm text-[#E8DFC0]"
    >
      <p>
        <strong>Archived version.</strong> This is a previous version of the{" "}
        {document}, replaced on {supersededOn}. It is kept for reference only.
        The current version is at{" "}
        <Link href={currentHref}>
          {currentHref.replace("/surround-it", "paulkreations.com/surround-it")}
        </Link>
        .
      </p>
      <p className="mt-2">{note}</p>
    </aside>
  );
}
