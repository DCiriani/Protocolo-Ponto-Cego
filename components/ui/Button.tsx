import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
}

const baseClasses = `
  group
  inline-flex
  items-center
  justify-center
  gap-4
  rounded-full
  bg-[#88B39A]
  px-9
  py-5
  text-[15px]
  font-semibold
  text-[#0A0A0A]
  transition-all
  duration-300
  hover:scale-[1.02]
  hover:bg-[#9FC2AD]
  active:scale-[0.98]
  whitespace-normal
  text-center
`;

export default function Button({
  children,
  className = "",
  href,
  type = "button",
}: ButtonProps) {
  const content = (
    <>
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={`${baseClasses} ${className}`}>
      {content}
    </button>
  );
}