import { drinksForMood } from "../../data/menu";
import { money } from "../../lib/format";
import PrimaryButton from "../ui/PrimaryButton";
import StepLabel from "../ui/StepLabel";
import BackButton from "../ui/BackButton";

// Step 2 — show drinks matched to the mood, with the signature special featured.
export default function MenuStep({
  firstName,
  moodObj,
  special,
  selected,
  onSelect,
  onBack,
  onNext,
}) {
  const list = drinksForMood(moodObj.id);
  const rest = list.filter((d) => d.id !== special.id);

  return (
    <section className="animate-rise flex flex-col gap-5">
      <div className="text-center">
        <StepLabel>Step 2 of 3</StepLabel>
        <h2 className="font-display text-cream text-3xl mt-2">
          {moodObj.emoji} {moodObj.label}?
        </h2>
        <p className="text-cream/70 mt-2">{moodObj.blurb}</p>
      </div>

      {/* Featured special */}
      <div>
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
          ✦ Our pick for you, {firstName}
        </p>
        <button
          onClick={() => onSelect(special)}
          className={`w-full text-left rounded-3xl p-5 transition active:scale-[0.99]
            border-2 ${
              selected?.id === special.id
                ? "border-pink bg-pink/15"
                : "border-gold/40 bg-white/8 hover:bg-white/12"
            }`}
        >
          <div className="flex items-start gap-4">
            <span className="text-4xl">{special.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-cream text-2xl">
                  {special.name}
                </h3>
                <span className="text-pink font-semibold whitespace-nowrap">
                  {money(special.price)}
                </span>
              </div>
              <p className="text-gold/80 text-xs uppercase tracking-wide mt-0.5">
                {special.line} · Signature
              </p>
              <p className="text-cream/70 text-sm mt-2">{special.desc}</p>
            </div>
          </div>
        </button>
      </div>

      {/* The rest for this mood */}
      <div className="flex flex-col gap-3">
        <p className="text-cream/60 text-sm">Or explore more for your mood</p>
        <div className="flex flex-col gap-3 max-h-[42vh] overflow-y-auto zula-scroll pr-1">
          {rest.map((d) => {
            const active = selected?.id === d.id;
            return (
              <button
                key={d.id}
                onClick={() => onSelect(d)}
                className={`w-full text-left rounded-2xl p-4 border transition active:scale-[0.99]
                  ${
                    active
                      ? "border-pink bg-pink/15"
                      : "border-white/10 bg-white/6 hover:bg-white/10"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{d.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-cream font-semibold">{d.name}</span>
                      <span className="text-pink text-sm whitespace-nowrap">
                        {money(d.price)}
                      </span>
                    </div>
                    <span className="text-cream/50 text-xs">{d.line}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <BackButton onClick={onBack} />
        <div className="flex-1">
          <PrimaryButton disabled={!selected} onClick={onNext}>
            {selected ? `Continue with ${selected.name}` : "Pick a drink"}
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
