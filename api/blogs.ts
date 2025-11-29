//TODO: api/blogs ?page={number}&limit={number}
type BlogsResponse = {
  success: boolean;
  blogs: [
    {
      id: Id;
      title: string;
      description: string;
      published_date: string;
      image: string;
    }
  ];
};

//TODO: api/blogs/{blog_id}
type BlogDetailsResponse = {
  success: boolean;
  blog: {
    id: Id;
    title: string;
    description: string;
    content: string;
    author: string;
    published_date: string;
    image: string;
  };
};
