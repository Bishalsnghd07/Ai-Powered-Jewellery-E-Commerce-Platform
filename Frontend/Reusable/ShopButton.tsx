interface ShopButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

const ShopButton = ({
  label = "See Product",
  onClick,
  className = "",
  variant = "primary",
}: ShopButtonProps) => {
  // Base classes that apply to all buttons
  const baseClasses =
    "flex h-[2.5rem] w-[10rem] cursor-pointer items-center justify-center transition-all duration-300 active:scale-110 rounded-lg";

  // Variant classes
  const variantClasses = {
    primary: "bg-[#D87D4A] hover:bg-[#f0ab82] text-white",
    secondary:
      "bg-transparent hover:bg-gray-100 text-[#D87D4A] border border-[#D87D4A]",
    outline:
      "bg-transparent hover:bg-black text-black hover:text-white border border-black",
  };

  return (
    <div className={`flex`}>
      <div
        className={`${baseClasses} ${variantClasses[variant]}`}
        onClick={onClick}
      >
        <p className="text-sm font-bold uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
};

export default ShopButton;
