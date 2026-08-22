// components/shared/social-icons.tsx
// Brand marks for social platforms. lucide-react (our icon library — see
// PROJECT_RULES.md) doesn't ship trademarked brand logos, so these are
// hand-rolled inline SVGs — the same approach already used for the Google
// Play triangle icon in components/apps/apps.tsx and components/layout/
// footer.tsx. Kept here, separate from any single palette, so both the
// crimson site footer and the green WIMM page can use them with their own
// colors via `className` / `currentColor`.

import type { SVGProps } from "react";

export type SocialIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function BaseIcon({ size = 16, ...props }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
}

export function InstagramIcon(props: SocialIconProps) {
  return (
    <BaseIcon {...props}>
      <path
        fill="currentColor"
        d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.5.5.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43C21.99 8.94 22 9.28 22 12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47C15.06 21.99 14.72 22 12 22s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77.5-.5 1.11-.9 1.77-1.15.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.92.04-1.4.19-1.73.32-.44.17-.75.37-1.07.7a2.9 2.9 0 0 0-.7 1.07c-.13.33-.28.81-.32 1.73C4.09 8.73 4.08 9.05 4.08 12s.01 3.27.06 4.32c.04.92.19 1.4.32 1.73.17.44.37.75.7 1.07.32.32.63.53 1.07.7.33.13.81.28 1.73.32 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.92-.04 1.4-.19 1.73-.32.44-.17.75-.37 1.07-.7.32-.32.53-.63.7-1.07.13-.33.28-.81.32-1.73.05-1.05.06-1.37.06-4.32s-.01-3.27-.06-4.32c-.04-.92-.19-1.4-.32-1.73a2.9 2.9 0 0 0-.7-1.07 2.9 2.9 0 0 0-1.07-.7c-.33-.13-.81-.28-1.73-.32C14.99 3.81 14.67 3.8 12 3.8Zm0 3.05a5.15 5.15 0 1 1 0 10.3 5.15 5.15 0 0 1 0-10.3Zm0 1.8a3.35 3.35 0 1 0 0 6.7 3.35 3.35 0 0 0 0-6.7Zm5.35-1.98a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z"
      />
    </BaseIcon>
  );
}

export function YoutubeIcon(props: SocialIconProps) {
  return (
    <BaseIcon {...props}>
      <path
        fill="currentColor"
        d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.94 4.75 12 4.75 12 4.75s-5.94 0-7.64.49a2.75 2.75 0 0 0-1.94 1.95C2 8.9 2 12 2 12s0 3.1.42 4.81a2.75 2.75 0 0 0 1.94 1.95c1.7.49 7.64.49 7.64.49s5.94 0 7.64-.49a2.75 2.75 0 0 0 1.94-1.95C22 15.1 22 12 22 12s0-3.1-.42-4.81ZM9.94 15.16V8.84L15.75 12l-5.81 3.16Z"
      />
    </BaseIcon>
  );
}

export function XIcon(props: SocialIconProps) {
  return (
    <BaseIcon {...props}>
      <path
        fill="currentColor"
        d="M13.6 10.62 20.24 3h-1.58l-5.76 6.62L8.3 3H3l6.96 9.97L3 21.3h1.58l6.08-6.99 4.85 6.99H21l-7.4-10.38Zm-2.15 2.47-.7-.99-5.6-7.96h2.42l4.52 6.42.7.99 5.88 8.35h-2.42l-4.8-6.81Z"
      />
    </BaseIcon>
  );
}

export function LinkedinIcon(props: SocialIconProps) {
  return (
    <BaseIcon {...props}>
      <path
        fill="currentColor"
        d="M19.04 3H4.96A1.96 1.96 0 0 0 3 4.96v14.08A1.96 1.96 0 0 0 4.96 21h14.08A1.96 1.96 0 0 0 21 19.04V4.96A1.96 1.96 0 0 0 19.04 3ZM8.34 18.14H5.7V9.75h2.64v8.39ZM7.02 8.62a1.53 1.53 0 1 1 0-3.06 1.53 1.53 0 0 1 0 3.06Zm11.12 9.52h-2.63v-4.08c0-.97-.02-2.22-1.35-2.22-1.36 0-1.57 1.06-1.57 2.15v4.15H10v-8.39h2.53v1.15h.04c.35-.66 1.2-1.36 2.48-1.36 2.65 0 3.14 1.75 3.14 4.02v4.58Z"
      />
    </BaseIcon>
  );
}

export function FacebookIcon(props: SocialIconProps) {
  return (
    <BaseIcon {...props}>
      <path
        fill="currentColor"
        d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.77l-.44 2.91h-2.33v7.03C18.34 21.24 22 17.08 22 12.06Z"
      />
    </BaseIcon>
  );
}

export const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  x: XIcon,
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
} as const;
