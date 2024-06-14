import React from "react";

/* eslint-disable react/prop-types */
export default function Publication({ publication }) {
  return (
    <div>
      <h1>{publication.title}</h1>
      <p>{publication.content}</p>
    </div>
  );
}
