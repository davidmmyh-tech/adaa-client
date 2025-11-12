import { mapImage } from '@/assets/images';
import { Link } from 'react-router';

export default function Map() {
  return (
    <Link
      to={
        'https://www.google.com/maps/place/%D9%85%D8%AC%D9%85%D8%B9+%D8%B1%D9%8A%DA%A4%D8%A7+%D9%84%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84%E2%80%AD/@21.6241349,39.1599785,17z/data=!3m1!4b1!4m6!3m5!1s0x15c3d1ad9f83c017:0x93e18103d6cabfa5!8m2!3d21.6241349!4d39.1625534!16s%2Fg%2F11yhzbh3ln?entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D'
      }
      className="block basis-8/12 overflow-hidden rounded-lg"
    >
      <img src={mapImage} alt="Logo" className="h-full object-cover" />
    </Link>
  );
}
