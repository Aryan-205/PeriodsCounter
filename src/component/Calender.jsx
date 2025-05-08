import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay } from "date-fns";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="text-xl px-2">←</button>
      <span className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</span>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="text-xl px-2">→</button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE"; // e.g., Mon, Tue...
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-xs text-center font-medium text-gray-600" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isToday = isSameDay(day, new Date());
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div key={day} className="flex justify-center items-center">
            <button
              onClick={() => setSelectedDate(cloneDay)}
              className={`w-8 h-8 rounded-full text-sm transition
                ${isSelected ? "bg-blue-500 text-white" : ""}
                ${isToday && !isSelected ? "border border-blue-400" : ""}
                ${!isCurrentMonth ? "text-gray-400" : ""}
                hover:bg-blue-100`}
            >
              {format(day, "d")}
            </button>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-7 gap-y-1" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="w-[300px] bg-white p-4 rounded-xl shadow-md border">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {selectedDate && (
        <p className="mt-4 text-sm text-center text-gray-700">
          Selected: {format(selectedDate, "PPP")}
        </p>
      )}
    </div>
  );
}