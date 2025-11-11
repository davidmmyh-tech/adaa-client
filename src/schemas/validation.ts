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
    path: ['confirmPassword']
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

export type RegisterForm = z.infer<typeof registerSchema>;
export type RegisterOrganizationForm = z.infer<typeof registerOrganizationSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
