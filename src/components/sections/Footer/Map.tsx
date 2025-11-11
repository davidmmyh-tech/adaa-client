import { mapImage } from '@/assets/images';

export default function Map() {
  return (
    <div className="basis-8/12 overflow-hidden rounded-lg">
      <img src={mapImage} alt="Logo" className="h-full object-cover" />
    </div>
  );
}
