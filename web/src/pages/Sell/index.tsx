import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { LoggedNav } from "../../components/LoggedNav";

export const Sell = () => {
  return (
    <div className="w-full">
      <Header />
      <LoggedNav />
      <div className="bg-[#21a0a0]">
        <h1 className="text-white text-2xl text-center pb-3 pt-3">Sell</h1>
      </div>
      <Footer />
    </div>
  );
};
