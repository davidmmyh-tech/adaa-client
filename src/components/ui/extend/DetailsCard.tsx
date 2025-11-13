import { Link } from 'react-router';
import Img from './Img';

type Props = {
  date?: string;
  title?: string;
  description?: string;
  image: string;
  to: string;
};

export default function DetailsCard({ date, title, description, image, to }: Props) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <Link to={to} className="block aspect-square shrink-0 sm:w-40">
        <Img src={image} className="rounded-xl object-cover" alt={title} />
      </Link>
      <div className="w-full space-y-4">
        <Link to={to} className="block text-xl font-semibold">
          {title}
        </Link>
        <p className="text-sm">{description}</p>
        <p className="text-end text-sm text-[#F5CA0C]">{date}</p>
      </div>
    </div>
  );
}
