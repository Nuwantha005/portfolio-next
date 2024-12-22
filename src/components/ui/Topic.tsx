import React from "react";

interface TopicProps {
  topicName: string;
}

function Topic({ topicName }: TopicProps) {
  return (
    <section className="bg-slate-400/50 max-w-96 max-h-20 shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300 border-2 border-gray-800 dark:border-gray-200">
      <h1 className="font-bold text-2xl"> {topicName} </h1>
    </section>
  );
}

export default Topic;
