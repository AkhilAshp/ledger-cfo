import React, { useState } from "react";

const DueDateCalculator: React.FC = () => {
  const [entityType, setEntityType] = useState("LLC");
  const [fiscalYearEnd, setFiscalYearEnd] = useState("12-31");
  const [state, setState] = useState("CA");

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const adjustForWeekend = (date: Date) => {
    const day = date.getDay();

    if (day === 0) date.setDate(date.getDate() + 1);
    if (day === 6) date.setDate(date.getDate() + 2);

    return date;
  };

  const currentYear = new Date().getFullYear();
  const [fyeMonth, fyeDay] = fiscalYearEnd.split("-").map(Number);

  /*
  --------------------------
  FEDERAL DUE DATE
  --------------------------
  */

  let monthOffset;

  if (entityType === "LLC" || entityType === "S-Corp") {
    monthOffset = 3;
  } else {
    // C-Corp special rule
    if (fiscalYearEnd === "06-30") {
      monthOffset = 3;
    } else {
      monthOffset = 4;
    }
  }

  let dueMonth = fyeMonth + monthOffset;
  let dueYear = currentYear;

  if (dueMonth > 12) {
    dueMonth -= 12;
    dueYear += 1;
  }

  const fedDueDate = new Date(dueYear, dueMonth - 1, 15);
  adjustForWeekend(fedDueDate);

  /*
  --------------------------
  EXTENSION DEADLINE
  --------------------------
  */

  let extensionMonth = fedDueDate.getMonth() + 6;
  let extensionYear = fedDueDate.getFullYear();

  if (extensionMonth > 11) {
    extensionMonth -= 12;
    extensionYear += 1;
  }

  const extensionDate = new Date(extensionYear, extensionMonth, 15);
  adjustForWeekend(extensionDate);

  /*
  --------------------------
  STATE DUE DATE
  --------------------------
  */

  let stateDueDate = new Date(fedDueDate);

  // Texas rule → always May 15
  if (state === "TX") {
    stateDueDate = new Date(fedDueDate.getFullYear(), 4, 15);
  }

  adjustForWeekend(stateDueDate);

  return (
    <section className="bg-white border border-black/5 rounded-sm p-8">
      <div className="grid lg:grid-cols-2 gap-12">

        {/* Inputs */}
        <div>
          <h3 className="text-lg font-semibold text-ink mb-6">Inputs</h3>

          <div className="space-y-6">

            <div>
              <label className="block text-sm text-muted mb-2">
                Entity Type
              </label>

              <select
                value={entityType}
                onChange={(e) => setEntityType(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 rounded-sm bg-white"
              >
                <option value="LLC">LLC (Partnership)</option>
                <option value="S-Corp">S-Corporation</option>
                <option value="C-Corp">C-Corporation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">
                Fiscal Year End
              </label>

              <select
                value={fiscalYearEnd}
                onChange={(e) => setFiscalYearEnd(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 rounded-sm bg-white"
              >
                <option value="12-31">December 31 (Calendar Year)</option>
                <option value="03-31">March 31</option>
                <option value="06-30">June 30</option>
                <option value="09-30">September 30</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">
                State
              </label>

              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-3 border border-black/10 rounded-sm bg-white"
              >
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="DE">Delaware</option>
                <option value="TX">Texas</option>
                <option value="FL">Florida</option>
              </select>
            </div>

          </div>
        </div>

        {/* Results */}
        <div>
          <h3 className="text-lg font-semibold text-ink mb-6">
            Key Dates
          </h3>

          <div className="space-y-6">

            <div className="bg-gray-50 rounded-sm p-6 border-l-4 border-ink">
              <div className="text-sm text-muted uppercase mb-1">
                Federal Return Due Date
              </div>

              <div className="text-2xl font-serif text-ink">
                {formatDate(fedDueDate)}
              </div>

              <div className="text-sm text-muted mt-2">
                Form 1065 / 1120 / 1120-S
              </div>
            </div>

            <div className="bg-gray-50 rounded-sm p-6 border-l-4 border-blue-600">
              <div className="text-sm text-muted uppercase mb-1">
                State Return Due Date ({state})
              </div>

              <div className="text-2xl font-serif text-ink">
                {formatDate(stateDueDate)}
              </div>
            </div>

            <div className="bg-gray-50 rounded-sm p-6 border-l-4 border-gray-400">
              <div className="text-sm text-muted uppercase mb-1">
                Extension Deadline
              </div>

              <div className="text-2xl font-serif text-ink">
                {formatDate(extensionDate)}
              </div>

              <div className="text-sm text-muted mt-2">
                With valid filed extension (Form 7004)
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default DueDateCalculator;