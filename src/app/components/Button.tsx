interface RoundedSlideButtonProps {
  text: string;
  className?: string;
  disabled?: boolean;
  onClick?:any;
}

const ButtonWrapper: React.FC<RoundedSlideButtonProps> = ({
  text,
  className,
  onClick,
}) => {
  return (
    <div className="flex min-h-[80px] 3xl:min-h-[70px] 4xl:min-h-[60px]   items-center justify-center">
      <RoundedSlideButton text={text} className={className} onClick={onClick} />
    </div>
  );
};

const RoundedSlideButton: React.FC<RoundedSlideButtonProps> = ({
  text,
  className,
  onClick
}) => {
  return (
    <button
    onClick={onClick}
      className={`
        relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px]  px-4 3xl:px-4 4xl:px-2 py-2 3xl:py-1 4xl:py-1 font-semibold transition-all duration-500
        
        before:absolute before:inset-0
        before:-z-10 before:translate-x-[150%]
        before:translate-y-[150%] before:scale-[2.5]
        before:rounded-[100%] before:bg-gradient-to-b from-[#B50D34] to-[#BAA716]
        before:transition-transform before:duration-1000
        before:content-[""]

        hover:scale-105 hover:text-white
        hover:before:translate-x-[0%]
        hover:before:translate-y-[0%]
        active:scale-95 ${className}
      `}
    >
      <span className="text-[18px] 3xl:text-[12px] 4xl:text-[12px] font-bold">
        {text}
      </span>
    </button>
  );
};

export default ButtonWrapper;
