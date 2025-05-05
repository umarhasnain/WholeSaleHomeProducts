// components/AccountCard.tsx
import { FC } from "react";
import { IconType } from "react-icons";

interface AccountCardProps {
  title: string;
  icon: IconType;
  onClick?: () => void;
}

const AccountCard: FC<AccountCardProps> = ({ title, icon: Icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="border rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition"
    >
      <Icon className="text-4xl text-gray-400 mb-4" />
      <h3 className="text-lg font-medium">{title}</h3>
    </div>
  );
};

export default AccountCard;
