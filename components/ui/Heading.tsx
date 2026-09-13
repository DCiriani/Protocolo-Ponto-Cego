import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

export default function Heading({
  children,
  className = "",
}: HeadingProps) {
  return (
    <h1
      className={`
        font-heading
        text-5xl
        leading-[1]
        tracking-[-0.03em]
        text-[#1E2B29]
        md:text-7xl
        ${className}
      `}
    >
      {children}
    </h1>
  );
}