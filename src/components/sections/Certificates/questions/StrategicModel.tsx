import CertificateSimpleModel from './CertificateSimpleModel';

type Props = { onSuccess?: () => void; isLast?: boolean };

export default function StrategicModel(props: Props) {
  return <CertificateSimpleModel track="strategic" {...props} />;
}
