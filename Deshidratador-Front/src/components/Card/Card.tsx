const Card = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) => {
  return (
    <div className="bg-white rounded-[10px] px-4 py-3 h-32">
      <p className="text-blue-950 text-base font-bold">{title}</p>
      <div className="flex justify-center items-center h-16">
          <span className="text-2xl mr-3">
            <img src={icon} alt={`${title} icon`} />
          </span>
          <p className="text-slate-500 text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Card;
