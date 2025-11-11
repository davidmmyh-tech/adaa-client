import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/extend/Logo';
import { useNavigate } from 'react-router';

export default function VerifiedEmailPage() {
  const navigate = useNavigate();

  return (
    <div className="container flex h-screen flex-col items-center justify-center gap-12">
      <Logo className="h-32 w-32" />
      <h2 className="text-4xl font-semibold">تم التحقق من البريد الإلكتروني</h2>
      <div>
        <Button className="me-2" onClick={() => navigate('/تسجيل-منظمة')}>
          سجل منظمتك الان
        </Button>
      </div>
    </div>
  );
}
