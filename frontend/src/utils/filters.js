const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const startOf = require('dayjs/plugin/startOf');

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(startOf);

const getDateRange = (dateFilter) => {
  const today = dayjs();
  let startDate, endDate;

  switch (dateFilter) {
    case 'thisWeek':
      startDate = today.startOf('week');
      endDate = today;
      break;
    case 'thisMonth':
      startDate = today.startOf('month');
      endDate = today;
      break;
    case 'lastMonth':
      startDate = today.subtract(1, 'month').startOf('month');
      endDate = today.subtract(1, 'month').endOf('month');
      break;
    case 'thisYear':
      startDate = today.startOf('year');
      endDate = today;
      break;
    case 'all':
    default:
      startDate = null;
      endDate = null;
      break;
  }

  return { startDate, endDate };
};

export const applyDateFilter = (data, dateFilter) => {
  const { startDate, endDate } = getDateRange(dateFilter);

  if (!startDate || !endDate) {
    return data;
  }

  return data.filter((item) => {
    const date = dayjs(item.date);
    return date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate);
  });
};

export const applyCategoryFilter = (data, categoryFilter) => {
  if (categoryFilter.length === 0) {
    return data;
  }

  return data.filter((item) => categoryFilter.includes(item.category));
};
