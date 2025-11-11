import { socialsMenuItems } from '@/constants/menus';
import { Link } from 'react-router';

export default function Socials() {
  return (
    <div className="space-y-4">
      <p>تابعنا علي</p>
      <ul className="flex gap-2">
        {socialsMenuItems.map(({ Icon, to }, index) => (
          <li key={index}>
            <Link to={to} target="_blank" rel="noopener noreferrer">
              <Icon size={35} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
