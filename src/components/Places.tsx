export default function PlacesCollection({
  places,
  title,
  fallbackText,
  onSelect,
}: {
  places?: unknown[];
  title?: string;
  fallbackText?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <section className="max-w-[85rem] mx-auto my-[2rem] p-[1rem] border-2 border-[#0d373e] rounded-[8px]">
      <h2 className="text-center text-[1.5rem] font-[Raleway] mb-[1rem] text-[#8feeff]">
        {title}
      </h2>
      {(places as []).length === 0 && (
        <p className="text-center text-base">{fallbackText}</p>
      )}
      {(places as []).length > 0 && (
        <ul className="max-w-[80rem] grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-[2rem] mx-[2rem] my-auto list-none">
          {(places as []).map((place: object, i: number) => {
            console.log(place);

            let buttonHoverClasses;
            if (i % 2 === 0) {
              buttonHoverClasses = "hover:rotate-[5deg] focus:rotate-[5deg]";
            } else {
              buttonHoverClasses = "hover:rotate-[-5deg] focus:rotate-[-5deg]";
            }
            return (
              <li
                key={(place as { id: string }).id}
                className="relative flex flex-col bg-[#1f1c2c] shadow-[0_0.5rem_1rem_rgba(0,0,0,0.15)] rounded-[8px] animate-[slide-up-fade-in_0.3s_ease-out_forwards]"
              >
                <button
                  className={`bg-transparent p-0 transition-all delay-200 ease-in-out hover:shadow-[0_0_8px_4px_rgba(255,217,0,0.6)] focus:shadow-[0_0_8px_4px_rgba(255,217,0,0.6)] hover:rounded-[8px] focus:rounded-[8px] ${buttonHoverClasses}`}
                  onClick={() => onSelect?.((place as { id: string }).id)}
                >
                  <img
                    className="w-full h-full object-cover rounded-[0.5rem]"
                    src={
                      ((place as { image: object }).image as { src: string })
                        .src
                    }
                    alt={
                      ((place as { image: object }).image as { alt: string })
                        .alt
                    }
                  />

                  <h3 className="bg-[#feee86] font-[Raleway] text-[0.9rem] text-[#1f1c2c] absolute bottom-0 right-[1rem] py-[.15rem] px-[0.35rem] shadow-[0_1px_4px_rgba(0,0,0,0.4)] rounded-[4px] my-[1rem] mx-auto">
                    {(place as { title: string }).title}
                  </h3>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
