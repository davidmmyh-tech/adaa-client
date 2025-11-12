import { humanResourcesIcon, operationalIcon, stratigicIcon } from '@/assets/icons';
import { Checkbox } from '@/components/ui/checkbox';
import LinkButton from '@/components/ui/extend/LinkButton';
import { Label } from '@/components/ui/label';
import { useMemo, useState } from 'react';

export default function CertificatePickTrackSection() {
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);

  const tracks = useMemo(
    () => [
      {
        name: 'operational',
        title: 'الأداء التشغيلي',
        description: 'يقيس جودة ممارسات الموارد البشرية والتخطيط الوظيفي.',
        icon: operationalIcon,
        bgColor: '#E6EEF5'
      },
      {
        name: 'strategic',
        title: 'الأداء الاستراتيجي',
        description: 'يقيس التوجّه الاستراتيجي والاستدامة وقياس الأثر.',
        icon: stratigicIcon,
        bgColor: '#EDE7F6'
      },
      {
        name: 'human-resources',
        title: 'الموارد البشرية',
        description: 'يقيس جودة ممارسات الموارد البشرية والتخطيط الوظيفي.',
        icon: humanResourcesIcon,
        bgColor: '#F4F6F9'
      }
    ],
    []
  );

  const hadelSelectTrack = (trackName: string) => {
    if (selectedTracks.includes(trackName)) {
      setSelectedTracks((prev) => prev.filter((name) => name !== trackName));
    } else {
      setSelectedTracks((prev) => [...prev, trackName]);
    }
  };

  return (
    <section className="container space-y-6">
      <h5 className="text-2xl font-semibold">مسارات التقييم</h5>
      <div className="flex flex-col justify-center gap-4 md:flex-row">
        {tracks.map((t) => (
          <CertificateTrackCard
            key={t.name}
            description={t.description}
            icon={t.icon}
            name={t.name}
            isSelected={selectedTracks.includes(t.name)}
            onSelect={() => hadelSelectTrack(t.name)}
            title={t.title}
            hexColor={t.bgColor}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <LinkButton to={`/شهادات-اداء/تقييم?tracks=${selectedTracks.join(',')}`} variant="secondary">
          بدء التقييم في المسارات
        </LinkButton>
      </div>
    </section>
  );
}

function CertificateTrackCard({
  hexColor,
  name,
  title,
  description,
  icon,
  isSelected,
  onSelect
}: {
  hexColor: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  isSelected: boolean;
  onSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="relative rounded-md p-4 md:w-80" style={{ backgroundColor: hexColor }}>
      <Label
        htmlFor={name}
        className="text-primary flex flex-row items-center justify-between gap-4 md:flex-col md:justify-start md:gap-8"
      >
        <div className="flex items-center gap-4 md:flex-col md:gap-8">
          <div className="absolute top-4 -mt-1 sm:static md:h-12 md:w-full">
            <Checkbox id={name} className="bg-white" checked={isSelected} onClick={onSelect} />
          </div>
          <img src={icon} alt="Track 1" className="hidden w-10 object-contain md:block" />
          <div className="flex flex-col gap-2 md:gap-8 md:text-center">
            <div className="ms-5 flex items-center gap-2 sm:ms-0 md:justify-center">
              <img src={icon} alt="Track 1" className="w-8 object-contain md:hidden" />
              <p className="text-lg font-semibold">{title}</p>
            </div>
            <p>{description}</p>
          </div>
        </div>
        <LinkButton to={`/شهادات-اداء/تقييم?tracks=${name}`} variant="outline" className="hidden md:flex">
          ابدأ هذا المسار
        </LinkButton>
        <LinkButton to={`/شهادات-اداء/تقييم?tracks=${name}`} variant="outline" className="md:hidden">
          ابدأ
        </LinkButton>
      </Label>
    </div>
  );
}
