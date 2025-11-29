//كرس اداء

//TODO: api/podcasts ?page={number}&limit={number}&query={string}
type PodcastsResponse = {
  success: boolean;
  podcasts: [
    {
      id: Id;
      title: string;
      short_description: string;
      published_at: string;
      image: string;
    }
  ];
};

//TODO: api/podcasts/{:id}
type PodcastResponse = {
  success: boolean;
  podcast: {
    id: Id;
    title: string;
    short_description: string;
    description: string;
    published_at: string;
    image: string;
    video_url: string;
    audio_url: string;
  };
};
