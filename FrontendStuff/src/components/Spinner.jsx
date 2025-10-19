// This is a simple, reusable spinner component.
// It's just an SVG icon that uses Tailwind's "animate-spin" class to rotate.
export function Spinner({ className }) {
  // This combines the default spinning animation with any extra styles you want to add
  const combinedClassName = `animate-spin ${className || ''}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={combinedClassName}
      color="white"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

