import CertificateSimpleModel from './CertificateSimpleModel';

type Props = { onSuccess?: () => void; isLast?: boolean };

export default function OperationalModel(props: Props) {
  return <CertificateSimpleModel track="operational" {...props} />;
}
