type Track = 'operational' | 'strategic' | 'human_resources';
type Certificate = 'diamond' | 'gold' | 'silver' | 'bronze';
type CertificateState = 'completed' | 'in_revision' | 'not_started';
type Id = string | number;

//TODO: api/certificate/my-progress
// for current user
type UserCertificateResponse = {
  success: boolean;
  operational: {
    state: 'completed' | 'in_revision' | 'not_started';
    result: number | 0; //percentage from 0 to 100
  };
  strategic: {
    state: 'completed' | 'in_revision' | 'not_started';
    result: number | 0; //percentage from 0 to 100
  };
  human_resources: {
    state: 'completed' | 'in_revision' | 'not_started';
    result: number | 0; //percentage from 0 to 100
  };
};

//TODO: api/certificate/download/{'operational' | 'strategic' | 'human_resources'}
// for current user
type UserCertificateDownloadResponse = Blob; //PDF file_url

//TODO: api/certificate/analytics
type CertificateAnalyticsResponse = {
  success: boolean;

  awarded_certificates: number;
  total_organizations: number;

  diamond_awarded: number;
  gold_awarded: number;
  silver_awarded: number;
  bronze_awarded: number;
};

//TODO: api/certificate/organizations
//TODO: page={number}&limit={number}&query={string}&year={number}
//TODO: &track={operational | strategic | human_resources}&certificate={diamond | gold | silver | bronze}
type TopOrganizationsResponse = {
  success: boolean;
  data: [
    {
      organization_name: string;
      track: 'operational' | 'strategic' | 'human_resources';
      certificate_earned: 'diamond' | 'gold' | 'silver' | 'bronze';
      result: number; //percentage from 0 to 100
      organization_website: number;
    }
  ];
};

//TODO: api/certificate/questions/{'operational' | 'strategic' | 'human_resources'}
type CertificateQuestionsResponse = {
  success: boolean;
  is_under_review: boolean;

  accomplished: boolean; //return true if organization/user already accomplished the track
  // no need to return questions/axies if accomplished is true

  axies: [
    {
      id: Id;
      title: string;
      questions: [
        {
          id: Id;
          question: string;
          options: [string];
          has_attachment: boolean;

          //user specific fields
          current_answer: string | null; //if user already did an interaction with question
          attachment: string; //file_url attachment after upload
        }
      ];
    }
  ];
};

//TODO: api/certificate/submit/{'operational' | 'strategic' | 'human_resources'}
type SubmitCertificateTrackBody = {
  answers: [
    {
      question_id: Id;
      answer: string;
      attachment: string; //file_url attachment after upload
    }
  ];
};

//TODO: api/certificate/save-progress/{'operational' | 'strategic' | 'human_resources'}
type SaveProgressBody = {
  answers: [
    {
      question_id: string;
      answer: string;
      attachment: string; //file_url attachment after upload
    }
  ];
};

//TODO: api/certificate/attachment/upload
//REQUEST: Multipart form data with 'file' field
//RESPONSE: { success: boolean; file_url: string; }
type CertificateAttachmentUploadResponse = {
  success: boolean;
  file_url: string;
};

//TODO: api/certificates/schedule
type CertificateScheduleResponse = {
  success: boolean;
  data: {
    submission: {
      start_date: string; //ISO date
      end_date: string; //ISO date
      note: string; //description/note
    };
    submission_end: {
      date: string; //ISO date
      note: string; //description/note
    };
    evaluation: {
      start_date: string; //ISO date
      end_date: string; //ISO date
      note: string; //description/note
    };
    announcement: {
      date: string; //ISO date
      note: string; //description/note
    };
    awarding: {
      start_date: string; //ISO date
      end_date: string; //ISO date
      note: string; //description/note
    };
  };
};
