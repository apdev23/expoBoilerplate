import { View, Text } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <View>
      <DateTimePicker
        mode="range"
        onChange={({ startDate: newStartDate, endDate: newEndDate }) => {
          setStartDate(newStartDate);
          setEndDate(newEndDate);
        }}
        startDate={startDate} // Pass state here
        endDate={endDate} // Pass state here
      />
      <Text className="text-sm text-black font-primary_font_regular">
        Start Date:{" "}
        {startDate ? dayjs(startDate).format("YYYY-MM-DD") : "Select"}
      </Text>
      <Text className="text-sm text-black font-primary_font_regular">
        End Date: {endDate ? dayjs(endDate).format("YYYY-MM-DD") : "Select"}
      </Text>
    </View>
  );
};

export default DateRangePicker;
