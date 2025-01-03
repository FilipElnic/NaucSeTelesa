import { useState } from "react";
import "../App.css";

function ImgSlider() {
  const [formData, setFormData] = useState({
    jmeno: "",
    prijmeni: "",
    prezdivka: "",
  });
  const [isVisible, setIsVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const handleHide = () => {
    setIsVisible(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      {isVisible && (
        <div className="w-[80vw] flex flex-col md:flex-row gap-6 border-form rounded-3xl bg-zinc-900 relative">
          <div className="w-full md:w-1/2 md:h-[80vh] bg-zinc-900 border-form rounded-3xl flex justify-center items-center md:items-start md:pl-20 flex-col text-white">
            <div className="w-3/4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-6xl font-bold pb-6 pt-5 md:pb-12">
                Skvělé, že jste se zaregistrovali!
              </h1>
              <p className="text-2xl mt-5 text-gray-300">
                Abychom vám mohli nabídnout co nejlepší, potřebujeme od vás
                ještě pár drobných informací.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:h-[80vh] bg-zinc-900 flex border-form rounded-3xl justify-center items-start flex-col p-6 lg:pr-16 xl:pr-32 relative">
            <div
              className="absolute top-0 right-0 m-2 md:m-10 w-8 h-8 flex justify-center items-center cursor-pointer"
              onClick={handleHide}
            >
              <div className="cross"></div>
            </div>

            <div className="flex w-full flex-col sm:flex-row gap-5">
              <div className="flex flex-col w-full items-center">
                <h3>Jméno</h3>
                <input
                  className="w-full h-16 bg-zinc-800 p-2 rounded-full"
                  type="text"
                  name="jmeno"
                  value={formData.jmeno}
                  onChange={handleChange}
                  placeholder="Karel"
                  required
                />
              </div>
              <div className="flex flex-col w-full items-center">
                <h3>Přijmení</h3>
                <input
                  className="w-full h-16 bg-zinc-800 rounded-full p-2"
                  type="text"
                  name="prijmeni"
                  value={formData.prijmeni}
                  onChange={handleChange}
                  placeholder="Novák"
                  required
                />
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <div className="flex flex-col w-full items-center mt-5">
                <h3>Přezdívka</h3>
                <input
                  className="w-full h-16 bg-zinc-800 rounded-full p-2"
                  type="text"
                  name="prezdivka"
                  value={formData.prezdivka}
                  onChange={handleChange}
                  placeholder="KarelNovak123"
                  required
                />
              </div>
            </div>

            <div className="w-full flex justify-center items-center mt-5 md:mt-10">
              <button
                className="w-1/2 h-14 bg-purple-950 rounded-2xl"
                onClick={handleSubmit}
              >
                Začít objevovat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImgSlider;
