import { money } from "../../lib/format";
import PrimaryButton from "../ui/PrimaryButton";
import StepLabel from "../ui/StepLabel";
import BackButton from "../ui/BackButton";

// A single label/value line in the receipt.
function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-purple-deep/60">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

// Step 3 — review the order as a receipt and place it.
export default function OrderStep({ firstName, drink, moodObj, onBack, onPlace }) {
  return (
    <section className="animate-rise flex flex-col gap-6">
      <div className="text-center">
        <StepLabel>Step 3 of 3</StepLabel>
        <h2 className="font-display text-cream text-3xl mt-2">Your order</h2>
        <p className="text-cream/70 mt-2">
          Matched to your {moodObj.emoji} {moodObj.label.toLowerCase()} mood.
        </p>
      </div>

      <div className="rounded-3xl bg-cream text-purple-deep p-6 shadow-xl shadow-black/30 animate-pop">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{drink.emoji}</span>
          <div className="flex-1">
            <h3 className="font-display text-3xl leading-none">{drink.name}</h3>
            <p className="text-purple/70 text-xs uppercase tracking-wide mt-1">
              {drink.line}
            </p>
          </div>
        </div>
        <p className="text-purple-deep/70 text-sm mt-4">{drink.desc}</p>

        <div className="border-t border-purple-deep/15 mt-5 pt-4 flex flex-col gap-2 text-sm">
          <Row label="For" value={firstName} />
          <Row label="Mood" value={`${moodObj.emoji} ${moodObj.label}`} />
          <Row label="Subtotal" value={money(drink.price)} />
        </div>
        <div className="border-t border-purple-deep/15 mt-4 pt-4 flex items-center justify-between">
          <span className="font-display text-2xl">Total</span>
          <span className="font-display text-2xl">{money(drink.price)}</span>
        </div>
      </div>

      <p className="text-center text-cream/55 text-sm">
        Show this screen at the counter to collect your cup ☕
      </p>

      <div className="flex gap-3">
        <BackButton onClick={onBack} />
        <div className="flex-1">
          <PrimaryButton onClick={onPlace}>Place order 💜</PrimaryButton>
        </div>
      </div>
    </section>
  );
}
