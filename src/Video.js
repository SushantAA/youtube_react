function Video({ url, title, author }) {
  if (!url) {
    return <div>Loading</div>;
  }

  return (
    <div className="video">
      <img
        alt=""
        className="yt-core-image--fill-parent-height yt-core-image--fill-parent-width yt-core-image yt-core-image--content-mode-scale-aspect-fill yt-core-image--loaded"
        src={url}
      />
      <div className="videoTitle">
        <div className="videoIcon"></div>
        <div className="videoDetails">
          <div className="videoText">{title}</div>
          <div className="channelName">{author}</div>
          <div className="videoViews">7M views</div>
        </div>
      </div>
    </div>
  );
}

export default Video;
