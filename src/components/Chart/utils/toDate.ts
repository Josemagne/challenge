/**
 * Converts a string representation of a time into a date
 * @param timeString
 * @param format
 * @returns
 */
export default function toDate(
  timeString: string,
  format: string
): Date | string {
  var now = new Date();

  if (format == "h:m") {
    now.setHours(parseInt(timeString.substring(0, timeString.indexOf(":"))));
    now.setMinutes(parseInt(timeString.substring(timeString.indexOf(":") + 1)));
    now.setSeconds(0);
    return now;
  } else return "Invalid Format";
}
