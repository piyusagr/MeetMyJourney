import React from "react";

export default function CarouselItem({imgUrl}) {
  return (
    <div className="carousel-card   flex-row">
      <img src={imgUrl} className="rounded-2xl w-[10rem] h-[8rem]"></img>
    </div>
  );
}