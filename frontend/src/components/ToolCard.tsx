import React from "react";

interface ToolCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  iconBgClass?: string;
  iconColorClass?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  icon: Icon,
  title,
  description,
  iconBgClass = "bg-blue-100",
  iconColorClass = "text-blue-600",
}) => {
  return (
    <div
      className="min-w-85 cursor-pointer bg-white p-4 rounded-xl shadow-md min-h-[120px]
    hover:shadow-lg active:scale-95 transition-transform duration-300 transform hover:-translate-y-1 hover:scale-[1]"
    >
      <div className="flex items-center space-x-3 mb-2">
        <div className={`${iconBgClass} ${iconColorClass} rounded-full p-2`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 whitespace-pre-line">{description}</p>
    </div>
  );
};

export default ToolCard;
