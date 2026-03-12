import { useOutletContext } from "react-router-dom";
import Landing from "./homePage/landing";
import ImageSlider from "./homePage/imageSlider";
import Services from "../../services/Services";

function HomeContent() {
  const { dark } = useOutletContext();

  return (
    <>
      <Landing dark={dark} />
      <ImageSlider dark={dark} />
      <Services dark={dark} />
    </>
  );
}

export default HomeContent;
