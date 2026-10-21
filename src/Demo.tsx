"use client";

import { useState } from "react";
import { SAMPLE_SCHEDULE, unlocked } from "./unlock";

export function Demo() {
  const [now, setNow] = useState(50);
  const amount = unlocked(SAMPLE_SCHEDULE, now);
  return (
    <main className="wrap">
      <p className="kicker">Educational reference</p>
      <h1>A cliff, then a line</h1>
      <p className="lede">
        Total 1000. Start 0, cliff 100, end 200. Before the cliff the unlocked amount is 0. This schedule is not stored on an NFT.
      </p>
      <label>
        Now ({now})
        <input type="range" min={0} max={250} value={now} onChange={(event) => setNow(Number(event.target.value))} />
      </label>
      <p>
        Unlocked <strong>{amount.toString()}</strong> of {SAMPLE_SCHEDULE.total.toString()}.
      </p>
    </main>
  );
}
