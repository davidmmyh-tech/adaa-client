import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/extend/Logo';
import { useNavigate } from 'react-router';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { ROUTES } from '@/routes';

export default function VerifiedEmailPage() {
  useDocumentHead({
    title: 'تم التحقق من البريد الإلكتروني - أداء',
    description: 'تم التحقق من بريدك الإلكتروني بنجاح. يمكنك الآن تسجيل الدخول إلى حسابك.'
  });

  const navigate = useNavigate();

  return (
    <div className="container flex h-screen flex-col items-center justify-center gap-12">
      <Logo className="h-32 w-32" />
      <h2 className="text-4xl font-semibold">تم التحقق من البريد الإلكتروني</h2>
      <div>
        <Button className="me-2" onClick={() => navigate(ROUTES.AUTH.LOGIN)}>
          تسجيل الدخول
        </Button>
      </div>
    </div>
  );
}
