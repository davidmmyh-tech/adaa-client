import React from 'react';

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function ServiceCard({ icon, title, description }: Props) {
  return (
    <div className="bg-card-secondary flex flex-col items-center space-y-2 rounded-xl border p-6 text-center shadow-md transition-transform duration-500 hover:-translate-y-1 hover:scale-101">
      <div className="h-12">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
}
