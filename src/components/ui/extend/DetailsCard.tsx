import { Link } from 'react-router';
import Img from './Img';
import { parsedDate } from '@/lib/utils';
import { memo } from 'react';

type Props = {
  date?: string;
  title: string;
  description: string;
  image: string;
  to?: string;
  handlePrefetch?: () => void;
};

const DetailsCard = memo(function DetailsCard({ date, title, description, image, to = '', handlePrefetch }: Props) {
  const Element = to ? Link : 'div';
  return (
    <div className="flex flex-col gap-6 sm:flex-row" onMouseEnter={handlePrefetch}>
      <Element to={to} className="block aspect-square shrink-0 sm:w-40">
        <Img src={image} className="rounded-xl object-cover" alt={title} />
      </Element>
      <div className="w-full space-y-4">
        <Element to={to} className="text-md block font-semibold">
          {title}
        </Element>
        <p className="text-sm">{description}</p>
        <p className="text-end text-sm text-[#F5CA0C]">{date && parsedDate(date)}</p>
      </div>
    </div>
  );
});

export default DetailsCard;
