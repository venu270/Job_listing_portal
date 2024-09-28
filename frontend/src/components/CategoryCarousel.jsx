import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "./redux/jobSlice";

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <div className="w-full max-w-xl mx-auto my-10 md:my-16">
      <Carousel>
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="flex items-center justify-center md:basis-1/2 lg:basis-1/3 px-2"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full py-2 px-4 md:py-3 md:px-6 text-sm md:text-base"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-y-1/2 left-0 transform -translate-y-1/2">
          <CarouselPrevious />
        </div>
        <div className="absolute inset-y-1/2 right-0 transform -translate-y-1/2">
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
