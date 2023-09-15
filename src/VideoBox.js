import { useEffect, useState } from "react";
import Video from "./Video.js";
import axios from "axios";

// const axios = require('axios');

function VideoBox() {
  const [data, setData] = useState(undefined);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://youtube-data8.p.rapidapi.com/playlist/videos/",
      params: {
        id: "PLcirGkCPmbmFeQ1sm4wFciF03D_EroIfr",
        hl: "en",
        gl: "US",
      },
      headers: {
        "X-RapidAPI-Key": "d0e3eb685dmsh3e4f57bb8137dd0p1b15c4jsne428daa5cd78",
        "X-RapidAPI-Host": "youtube-data8.p.rapidapi.com",
      },
    };

    async function getData() {
      const response = await axios.request(options);
      console.log(response.data);

      setData(response.data.contents);
    }

    getData();
  }, []);

  if (!data) return <div>Loading</div>;

  let videoArr = [];

  let startPage = 20 * page;
  let endPage = startPage + 20;

  if (startPage < 0 || endPage >= 100) {
    setPage(0);
  }

  for (let i = startPage; i < endPage; i++) {
    videoArr.push(
      <Video
        key={i}
        url={data[i].video.thumbnails[3].url}
        title={data[i].video.title}
        author={data[i].video.author.title}
      />
    );
  }

  return (
    <div className="videoBoxController">
      <div className="videoController">
        <button onClick={() => setPage(page - 1)}>Privious Page</button>
        Page {page + 1}
        <button onClick={() => setPage(page + 1)}>Next Page</button>
      </div>
      <div className="videoBox">{videoArr}</div>
    </div>
  );
}

export default VideoBox;
