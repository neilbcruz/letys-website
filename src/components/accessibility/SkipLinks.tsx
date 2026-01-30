// src/components/accessibility/SkipLinks.tsx
export function SkipLinks() {
  return (
    <>
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <a href="#navigation" className="skip-to-main">
        Skip to navigation
      </a>
      <a href="#footer" className="skip-to-main">
        Skip to footer
      </a>
    </>
  );
}