import {
  useEffect,
  useState
} from "react";
import Video from "./Video.js";
import axios from "axios";
import { videBoxData } from "./videoBoxData.js";

function VideoBox({ resultText, setResultText }) {
  const [data, setData] = useState(undefined);
  const [page, setPage] = useState(0);
  const [videoArr, setVideoArr] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(undefined);
    setVideoArr([]);

    const options = {
      method: "GET",
      url: "https://youtube-data8.p.rapidapi.com/search/",
      params: {
        q: resultText,
        hl: "en",
        gl: "US",
      },
      headers: {
        "X-RapidAPI-Key": "a09e68c215msh06895de05dfd523p18a81bjsne76a8b651531",
        "X-RapidAPI-Host": "youtube-data8.p.rapidapi.com",
      },
    };

    async function getData() {
      try {
        const response = await axios.request(options);
        console.log(response.data);

        const videoData = response.data.contents.filter(
          (a) => a.type === "video"
        );

        setData(videoData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
    setPage(0);
    setData(videBoxData.contents);
    setLoading(true);
  }, [resultText]);

  useEffect(() => {
    console.log("data = ", data);
    if (loading || !data) return;

    const VIDEOS_COUNT = 15;
    let startPage = VIDEOS_COUNT * page;
    let endPage = startPage + VIDEOS_COUNT;

    console.log(" data.length = ", data.length);

    if (startPage < 0 || endPage >= data.length) {
      setPage(0);
    }

    console.log("mkc : ", data);

    let tempVideoArr = [];

    for (let i = startPage; i < endPage && i < data.length; i++) {
      tempVideoArr.push(
        <Video
          key={i}
          url={data[i].video.thumbnails[0].url}
          title={data[i].video.title}
          author={data[i].video.author.title}
        />
      );

      setVideoArr(tempVideoArr);
    }
  }, [data, page]);

  if (loading) {
    return (
      <div className="videoLoading">
        <div class="loadingio-spinner-double-ring-zlkmeniv96">
          <div class="ldio-79onc5rioyd">
            <div></div>
            <div></div>
            <div>
              <div></div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
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
