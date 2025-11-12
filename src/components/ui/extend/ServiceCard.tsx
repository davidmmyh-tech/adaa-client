import React from 'react';

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function ServiceCard({ icon, title, description }: Props) {
  return (
    <div className="card">
      <div className="h-12">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
}
