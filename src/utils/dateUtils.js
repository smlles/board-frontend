export const formatPostDate = (createDate) => {
  let date;
  // createDate가 시간대 정보 없이 "YYYY-MM-DD HH:mm:ss" 형식의 문자열인지 확인합니다.
  const plainDateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

  if (typeof createDate === 'string' && plainDateTimeRegex.test(createDate)) {
    // UTC로 가정하고 ISO 8601 UTC 문자열 (YYYY-MM-DDTHH:mm:ssZ)로 변환합니다.
    const isoString = createDate.replace(' ', 'T') + 'Z';
    date = new Date(isoString);
  } else {
    // 다른 형식 (예: Z 또는 오프셋이 있는 ISO 8601)의 경우, new Date()가 올바르게 처리합니다.
    date = new Date(createDate);
  }

  const now = new Date(); // 현재 로컬 시간

  // KST (년, 월, 일)로 날짜를 비교하기 위한 포맷터
  const kstDateComparator = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul'
  });

  // 비교를 위해 포맷된 날짜를 가져옵니다.
  const postDateFormattedKST = kstDateComparator.format(date);
  const nowFormattedKST = kstDateComparator.format(now);

  if (postDateFormattedKST === nowFormattedKST) {
    // 한국 표준시 기준으로 오늘이라면, 시간을 (HH:mm)으로 표시합니다.
    return new Intl.DateTimeFormat('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Seoul'
    }).format(date);
  } else {
    // 한국 표준시 기준으로 오늘이 아니라면, 날짜를 (MM-DD)로 표시합니다.
    return new Intl.DateTimeFormat('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Seoul'
    }).format(date);
  }
};
