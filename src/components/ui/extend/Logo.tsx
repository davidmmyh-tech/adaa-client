import { logoLayers } from '@/assets/images';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';

const variants = {
  dark: 'brightness-0',
  light: 'brightness-0 invert',
  default: ''
};

type Variant = keyof typeof variants;
type Props = { isLoading?: boolean; variant?: Variant; className?: string };

export default function Logo({ variant = 'default', isLoading, className }: Props) {
  const Element = isLoading ? 'div' : Link;
  return (
    <Element
      to="/"
      className={cn(
        'relative flex h-20 w-20 shrink-0 items-center justify-center',
        // 'hover:[&>img:nth-child(2)]:logo-spinner-reverse hover:[&>img:first-child]:logo-spinner',
        className
      )}
    >
      {/* Circle 1 */}
      <img
        src={logoLayers.layer1}
        alt="Circle 1"
        className={cn('absolute inset-0 h-full w-full object-contain', variants[variant], isLoading && 'logo-spinner')}
        style={{ zIndex: 1 }}
      />

      {/* Circle 2 */}
      <img
        src={logoLayers.layer2}
        alt="Circle 2"
        className={cn(
          'absolute inset-0 z-2 m-auto h-[78%] w-[78%] object-contain',
          variants[variant],
          isLoading && 'logo-spinner-reverse'
        )}
      />

      {/* Logo */}
      <img
        src={logoLayers.layer3}
        alt="Logo"
        className={cn('absolute inset-0 z-3 m-auto h-2/3 w-2/3 object-contain', variants[variant])}
      />
    </Element>
  );
}
