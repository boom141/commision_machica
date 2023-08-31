
const isLeapYear = (year) => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };
  
  const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
  };
  
  let calendar = document.querySelector('.calendar');
  const month_names = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  
  const month_picker = document.querySelector('#month-picker');
  const calendar_year = document.querySelector('#year');
  const calendar_days = document.querySelector('.calendar-days');
  
  console.log(calendar_days)

  const generateCalendar = (month, year) => {
    calendar_days.innerHTML = '';
    let days_of_month = [
      31,
      getFebDays(year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
    
    
  month_picker.value = month_names[month]; //cuurent month
  calendar_year.innerHTML = year; //current year
  
  let first_day = new Date(year, month);
  
  calendar_days.innerHTML = "";
  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
      let day = document.createElement('div');
      day.classList.add("day");

      if (i >= first_day.getDay()) {
            day.innerHTML = i - first_day.getDay() + 1;

        }
    
    calendar_days.appendChild(day);

    }
  
  };

const currentDate = new Date();
const currentMonth = { value: currentDate.getMonth() };
const currentYear = { value: currentDate.getFullYear() };

generateCalendar(currentMonth.value, currentYear.value);
