"use client";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className="flex flex-col justify-center items-center text-white text-3xl font-semibold bg-[#191919] p-8 tracking-wide">
      {title.toUpperCase()}
    </header>
  );
}
