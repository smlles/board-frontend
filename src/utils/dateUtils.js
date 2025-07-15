export const formatPostDate = (createDate) => {
  let date;
  // Check if createDate is a string and looks like "YYYY-MM-DD HH:mm:ss" without timezone info
  const plainDateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

  if (typeof createDate === 'string' && plainDateTimeRegex.test(createDate)) {
    // Assume it's UTC and convert to ISO 8601 UTC string (YYYY-MM-DDTHH:mm:ssZ)
    const isoString = createDate.replace(' ', 'T') + 'Z';
    date = new Date(isoString);
  } else {
    // For other formats (e.g., ISO 8601 with Z or offset), new Date() handles it correctly
    date = new Date(createDate);
  }

  const now = new Date(); // Current local time

  // Formatter for comparing dates in KST (year, month, day)
  const kstDateComparator = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul'
  });

  // Get formatted dates for comparison
  const postDateFormattedKST = kstDateComparator.format(date);
  const nowFormattedKST = kstDateComparator.format(now);

  if (postDateFormattedKST === nowFormattedKST) {
    // If it's today in KST, show HH:mm in KST
    return new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Seoul'
    }).format(date);
  } else {
    // If not today in KST, show MM-DD in KST
    return new Intl.DateTimeFormat('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Seoul'
    }).format(date);
  }
};
