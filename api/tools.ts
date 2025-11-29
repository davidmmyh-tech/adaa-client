//ادوات اداء

//TODO: api/tools/{power-bi | dashboards | sheets} ?page={number}&limit={number}
type ToolsResponse = {
  success: boolean;
  data: [
    {
      id: Id;
      title: string;
      description: string;
      image: string;
    }
  ];
};

//TODO: api/tools/{power-bi | dashboards | sheets}/download/{:id}
type ToolDownloadResponse = Blob; //File could be PDF, Excel, PowerBI file etc
