const timestamp = "2023-06-27T12:20:27.363Z";
const date = new Date(timestamp);
const humanReadableDate = date.toLocaleString();

console.log(humanReadableDate); // Output: 6/27/2023, 12:20:27 PM

const formattedTime = date.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

const formattedDate = date.toLocaleString("en-US", {
  day: "numeric",
  weekday: "long",
});

const formattedTimestamp = `${formattedTime.toLowerCase()}\n${formattedDate}`;

console.log(formattedTimestamp); // Output: 12:20 pm\nTuesday
