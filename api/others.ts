//TODO: api/contact-us
type ContactUsBody = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

//TODO: api/sponsorship
type SponsorshipBody = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

//TODO: api/newsletter
type NewsletterBody = {
  email: string;
};

//TODO: api/inquiry
type InquiryBody = {
  content: string;
};
