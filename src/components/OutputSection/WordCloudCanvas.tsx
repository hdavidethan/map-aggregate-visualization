import React, { useEffect } from "react";
import WordCloud from "wordcloud";

interface Props {
  data: [string, number][];
}

function WordCloudCanvas({ data }: Props) {
  useEffect(() => {
    const element = document.getElementById("word-cloud");
    if (element !== null) {
      WordCloud(element, { list: data, weightFactor: 3 });
    }
  }, [data]);

  return <canvas id="word-cloud" width="600" height="400" />;
}

export default WordCloudCanvas;
