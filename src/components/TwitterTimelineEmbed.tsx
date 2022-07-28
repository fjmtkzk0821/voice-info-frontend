import React, { useState } from "react";

type IProps = {
    theme: string,
    height: string,
    id: string
}

export default function TwitterTimelineEmbed({theme, height, id}: IProps) {
  const [state, setState] = useState(false);

  function twitterLoad() {
    var twttr: any = (window as any).twttr;
        if(twttr === undefined) {
            setTimeout(() => twitterLoad(), 1000)
        } else {
            twttr.ready(() => {
                twttr.widgets.createTimeline(
                  {
                    sourceType: "profile",
                    screenName: "VOICEINFO_staff",
                  },
                  document.getElementById("timeline"),
                  {
                    height: "500"
                  }
                );
              });
        }
  }

  React.useEffect(() => {
    twitterLoad();
  }, []);

  return <div id="timeline"></div>;

  if (state)
    return (
      <React.Fragment>
        <a
          className="twitter-timeline"
          data-theme={theme}
          data-height={height}
          href={`https://twitter.com/${id}?ref_src=twsrc%5Etfw`}
        >
          Tweets by fjmtkzk0821
        </a>{" "}
        {/* <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script> */}
      </React.Fragment>
    );
  else return <div></div>;
}
