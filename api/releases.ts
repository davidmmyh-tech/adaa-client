//TODO: api/releases ?page={number}&limit={number}
type ReleasesResponse = {
  success: boolean;
  data: [
    {
      id: string;
      title: string;
      short_description: string;
      published_date: string;
      image: string;
    }
  ];
};

//TODO: api/releases/{release_id}
type ReleaseDetailsResponse = {
  success: boolean;
  data: {
    id: string;
    title: string;
    short_description: string;
    description: string;
    author: string;
    published_date: string;
    image: string;
  };
};

//TODO: api/releases/{release_id}/download
type ReleaseDownloadResponse = Blob; //PDF File
