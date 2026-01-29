// Shared date utilities for publications and patents

export const monthNames = {
  jan: "January", feb: "February", mar: "March", apr: "April",
  may: "May", jun: "June", jul: "July", aug: "August",
  sep: "September", oct: "October", nov: "November", dec: "December"
};

export const monthToNum = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
};

export const formatDate = (bibTeX) => {
  if (!bibTeX?.year) return null;
  const month = bibTeX.month ? monthNames[bibTeX.month.toLowerCase()] : null;
  return month ? `${month} ${bibTeX.year}` : `${bibTeX.year}`;
};

export const sortByDateDesc = (items) => {
  return [...items].sort((a, b) => {
    const yearA = a.bibTeX?.year || 0;
    const yearB = b.bibTeX?.year || 0;
    if (yearB !== yearA) return yearB - yearA;
    const monthA = monthToNum[a.bibTeX?.month?.toLowerCase()] ?? 0;
    const monthB = monthToNum[b.bibTeX?.month?.toLowerCase()] ?? 0;
    return monthB - monthA;
  });
};
