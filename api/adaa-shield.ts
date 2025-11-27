//درع اداء
type Id = string | number;

//TODO: api/shield/anlytics
type AdaaShieldAnalyticsResponse = {
  success: boolean;
  total_organizations_awarded: number;
  highest_rate: number; //percentage from 0 to 100
  average_rate: number; //percentage from 0 to 100
  organizations_completed_ratio: number; //percentage from 0 to 100
};

//TODO: api/shield/organizations
//TODO: page={number}&limit={number}&query={string}&year={number}
//TODO: &grade={good | very_good | excellent | acceptable}&region={string}
type AdaaShieldOrganizationsResponse = {
  success: boolean;
  data: [
    {
      organization_name: string;
      organization_website: string;
      grade: 'good' | 'very_good' | 'excellent' | 'acceptable';
      region: string;
      year: number;
      rate: number; //percentage from 0 to 100
    }
  ];
};

//TODO: api/shield/download-results
type AdaaShieldDownloadResponse = Blob; // PDF file

//TODO: api/shield/questions
type AdaaShieldQuestionsResponse = {
  success: boolean;
  axes: [
    {
      id: Id;
      title: string;
      questions: [
        {
          id: string;
          question: string;

          //user specific fields if user already did an interaction with question
          current_answer: string | null; //selected answer id
          attachment: string; //file attachment after upload
        }
      ];
    }
  ];
};

//TODO: api/shield/submit
type SubmitShieldBody = {
  answers: [
    {
      question_id: string;
      answer: boolean;
      attachment: string; //file attachment after upload
    }
  ];
};

//TODO: api/shield/save-progress
type SaveShieldProgressBody = {
  answers: [
    {
      question_id: string;
      answer: boolean;
      attachment: string; //file attachment after upload
    }
  ];
};

//TODO: api/shield/attachment/upload
//REQUEST: Multipart form data with 'file' field
//RESPONSE: { success: boolean; file_url: string; }
type ShieldAttachmentUploadResponse = {
  success: boolean;
  file_url: string;
};
