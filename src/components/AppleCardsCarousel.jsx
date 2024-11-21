"use client";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";


export function AppleCardsCarousel({music}) { 
  const limitedMusic = music.slice(0, 10);
  const cards = limitedMusic.map((card, index) => (
    <Card key={card.index} card={card} index={index} layout={true} />
  ));

  return (
    (<div className="w-full h-full py-20">
      <h2
        className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-center text-neutral-200 font-sans">
        This songs are straight fireeee
      </h2>
      <Carousel items={cards} />
    </div>)
  );
}

