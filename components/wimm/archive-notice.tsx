import Link from "next/link";

// components/wimm/archive-notice.tsx
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
      className="border border-[#EAD9AE] bg-[#FBF1DD] px-4 py-3 text-sm text-[#3A4A42]"
    >
      <p>
        <strong>Archived version.</strong> This is a previous version of the{" "}
        {document}, replaced on {supersededOn}. It is kept for reference only.
        The current version is at{" "}
        <Link href={currentHref}>
          {currentHref.replace("/wimm", "paulkreations.com/wimm")}
        </Link>
        .
      </p>
      <p className="mt-2">{note}</p>
    </aside>
  );
}
