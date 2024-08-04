import axios from "axios";

export default async function handler(req: any, res: any) {
  try {
    const response = await axios.get(
      "https://api.fast.com/netflix/speedtest/v2",
      {
        params: {
          https: true,
          token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
          urlCount: 5,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
