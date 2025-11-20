import z from 'zod';

// const passwordRegexValidation = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

export const registerSchema = z
  .object({
    email: z.email('البريد المستخدم ليس بريداً').min(1, { message: 'البريد المستخدم ليس بريداً' }),
    first_name: z.string().min(1, { message: 'الاسم مطلوب' }),
    last_name: z.string().min(1, { message: 'الاسم مطلوب' }),
    phone: z.string().min(10, { message: 'رقم الهاتف ليس صحيح' }),
    post: z.string().min(1, { message: 'العان البريدي مطلوب' }),
    password: z.string().min(8, { message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' }),
    password_confirmation: z.string(),
    role: z.string({ error: 'الصلاحية مطلوبه' }).min(1, { message: 'اختيار الصلاحية مطلوب' })
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'تاكيد كلمة المرور لا تتوافق مع كلمة المرور',
    path: ['password_confirmation']
  });

export const registerOrganizationSchema = z.object({
  name: z.string().min(1, { message: 'اسم المؤسسة مطلوب' }),
  email: z.email('البريد المستخدم ليس بريداً').min(1, { message: 'البريد المستخدم ليس بريداً' }),
  phone: z.string().min(10, { message: 'ادخل رقما صحيحا' }),
  // address: z.string().min(1, { message: 'العنوان مطلوب' }),
  // established_at: z.string().min(1, { message: 'تاريخ التأسيس مطلوب' }),
  executive_name: z.string().min(1, { message: 'اسم المسؤول التنفيذي مطلوب' }),
  license_number: z.string().min(1, { message: 'رقم الترخيص مطلوب' })
  // website: z.url().min(1, { message: 'الموقع الإلكتروني مطلوب' })
});

export const loginSchema = z.object({
  email: z.email({ message: 'أدخل بريدا صحيحا' }),
  password: z.string().min(1, { message: 'كلمة السر مطلوبة' })
});

export const contactSchema = z.object({
  name: z.string().min(1, { message: 'الاسم مطلوب' }),
  email: z.email('البريد المستخدم ليس بريداً').min(1, { message: 'البريد المستخدم ليس بريداً' }),
  phone: z.string().min(10, { message: 'رقم الهاتف ليس صحيح' }),
  subject: z.string().min(1, { message: 'الموضوع مطلوب' }),
  message: z.string().min(1, { message: 'الرسالة مطلوبة' })
});

export const sponsorshipSchema = z.object({
  entity_name: z.string().min(1, { message: 'اسم المؤسسة مطلوب' }),
  entity_type: z.string().min(1, { message: 'نوع المؤسسة مطلوب' }),
  email: z.email('البريد المستخدم ليس بريداً').min(1, { message: 'البريد المستخدم ليس بريداً' }),
  phone: z.string().min(10, { message: 'رقم الهاتف ليس صحيح' }),
  name: z.string().min(1, { message: 'اسم الممثل مطلوب' }),
  message: z.string().min(1, { message: 'المجالات المطلوب تقديم الرعاية بها مطلوبة' })
});

export const subscribeSchema = z.object({
  name: z.string().min(1, { message: 'الاسم مطلوب' }),
  email: z.string().email('البريد الإلكتروني غير صحيح').min(1, { message: 'البريد الإلكتروني مطلوب' }),
  phone: z.string().min(10, { message: 'رقم الهاتف يجب أن يكون 10 أرقام على الأقل' }),
  plan_id: z.enum(['1', '2'], { message: 'يجب اختيار خطة الاشتراك' }),
  attachment: z
    .instanceof(File, { message: 'يرجى إرفاق شاهد التحويل' })
    .refine((file) => file.size <= 10 * 1024 * 1024, { message: 'حجم الملف يجب أن لا يتجاوز 10 ميجابايت' })
    .refine(
      (file) =>
        [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'image/jpeg',
          'image/png'
        ].includes(file.type),
      { message: 'نوع الملف يجب أن يكون PDF, Word, أو صورة' }
    )
});

export type RegisterForm = z.infer<typeof registerSchema>;
export type RegisterOrganizationForm = z.infer<typeof registerOrganizationSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type ContactForm = z.infer<typeof contactSchema>;
export type SubscribeForm = z.infer<typeof subscribeSchema>;
export type SponsorshipForm = z.infer<typeof sponsorshipSchema>;
