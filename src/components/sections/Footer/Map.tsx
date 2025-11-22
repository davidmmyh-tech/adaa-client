import { mapImage } from '@/assets/images';
import { LOCATION_URL } from '@/constants/data';
import { Link } from 'react-router';

export default function Map() {
  return (
    <Link to={LOCATION_URL} className="block basis-8/12 overflow-hidden rounded-lg">
      <img src={mapImage} alt="Logo" className="h-full object-cover" />
    </Link>
  );
}
