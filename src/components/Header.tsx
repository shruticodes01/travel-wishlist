import Logo from "../assets/logo.png";
export default function Header() {
  return (
    <header className="text-center">
      <img
        src={Logo}
        alt="website logo"
        className="w-[5rem] h-[5rem] object-contain mx-auto drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]"
      />
      <h1 className="uppercase text-[3rem] tracking-[1rem]">Placepicker</h1>
      <p className="max-w-[38ch] mx-auto text-wrap text-[1.15rem] text-[#9eb5b4]">
        Create your personal collection of places you would like to visit or you
        have visited.
      </p>
    </header>
  );
}
