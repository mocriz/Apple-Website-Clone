const CarouselButtonLinks = (props) => {
  return (
    <a href={props.link} className="block">
      <button className="bg-white py-1.5 px-4 rounded-full font-sfProDisplay cursor-pointer medium:py-[11px] medium:px-[21px] medium:text-lg">{props.text}</button>
    </a>
  );
};

export default CarouselButtonLinks;