import { money } from "../../lib/format";
import PrimaryButton from "../ui/PrimaryButton";
import BackButton from "../ui/BackButton";

// Step 3 — show the cart as a receipt and place the order.
export default function OrderStep({ firstName, cart, moodObj, onBack, onPlace }) {
  const total = cart.reduce((sum, d) => sum + d.price, 0);

  return (
    <section
      className="animate-rise h-full flex flex-col justify-between px-6 pt-8 pb-6"
      style={{ color: moodObj.ink }}
    >
      <div className="text-center shrink-0">
        <p className="text-sm uppercase tracking-[0.2em] opacity-70">
          Your order
        </p>
        <h2 className="display-lg mt-1">
          {cart.length} {cart.length === 1 ? "item" : "items"} for you
        </h2>
        <p className="text-sm opacity-75 mt-1">
          Matched to your {moodObj.emoji} {moodObj.label.toLowerCase()} mood.
        </p>
      </div>

      {/* Receipt */}
      <div className="rounded-3xl bg-cream text-purple-deep p-5 shadow-xl shadow-black/30 flex flex-col min-h-0 animate-pop">
        <div className="flex-1 min-h-0 overflow-y-auto zula-scroll flex flex-col divide-y divide-purple-deep/10">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-3">
              <span className="text-3xl">{item.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold leading-tight">{item.name}</p>
                <p className="text-purple-deep/50 text-xs uppercase tracking-wide">
                  {item.line}
                </p>
              </div>
              <span className="font-medium whitespace-nowrap">
                {money(item.price)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-purple-deep/15 mt-1 pt-4 flex items-center justify-between shrink-0">
          <span className="display-md">Total</span>
          <span className="display-md">{money(total)}</span>
        </div>
      </div>

      <div className="shrink-0 flex flex-col gap-3">
        <p className="text-center text-xs opacity-70">
          Show this screen at the counter to collect your order ☕
        </p>
        <div className="flex gap-3">
          <BackButton onClick={onBack} />
          <div className="flex-1">
            <PrimaryButton onClick={onPlace}>Place order</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
