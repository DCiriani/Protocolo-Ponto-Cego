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
  rounded-[0.65rem]
  bg-[#5F7A4F]
  px-8
  py-5
  text-center
  text-[15px]
  font-semibold
  text-white
  transition-all
  duration-300
  hover:scale-[1.01]
  hover:bg-[#6D895B]
  active:scale-[0.98]
`;

export default function Button({
  children,
  className = "",
  href,
  type = "button",
}: ButtonProps) {
  const content = (
    <>
      <span>{children}</span>
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