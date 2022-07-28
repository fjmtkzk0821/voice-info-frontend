import { useEffect } from "react";

type IProps = {
    src: string
}

function TwitterTweetEmbed({src}: IProps) {
    const key = `tte-${src}`;
    // console.log(key);

    function tweetLoad() {
        var twttr: any = (window as any).twttr;
        if(twttr === undefined) {
            setTimeout(() => tweetLoad(), 1000)
        } else {
            twttr.ready(() => {
                twttr.widgets.createTweet(
                  src,
                  document.getElementById(key),
                  {
                      align: "center"
                  }
                );
              });
        }
    }

    useEffect(() => {
        tweetLoad()
    }, []);
    
    return (<div id={key}></div>);
}

export default TwitterTweetEmbed