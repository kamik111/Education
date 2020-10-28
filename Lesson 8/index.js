/*

const currentDate = new Date();

console.log( currentDate );

console.log( getLastDayNumberOfCurrentMonth() );

function getLastDayNumberOfCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    currentDate.setMonth(currentMonth + 1);
    currentDate.setDate(0);

    return currentDate.getDate();
}

// month: 1 - 12
function getLastDayNumberOfMonth(month) {
    const currentDate = new Date();

    currentDate.setMonth(month);
    currentDate.setDate(0);

    return currentDate.getDate();
}

function clearCalendarDysList() {
    const listElement = getCalendarDaysListElement();

    listElement.innerText = '';
}
*/




function MakeCalendar(selector, year, month) {
    this.MONTH_NAMES = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    this.rootEl = document.querySelector(selector);
    this.headerEl = this.rootEl.querySelector('.calendar-header');
    this.daysEl = this.rootEl.querySelector('.calendar-days');

    this.currentDate = new Date();
    if (!year || !month) {
        this.year = this.currentDate.getFullYear();
        this.month = this.currentDate.getMonth() + 1;
    }

    this.clear();
    this.init();
    this.fill();

    this.getTitle();

    return this;

}


MakeCalendar.prototype.getTitle = function () {
    return this.MONTH_NAMES[this.month - 1] + ' ' + this.year;
}

MakeCalendar.prototype.clear = function () {
    this.daysEl.innerText = '';
    this.headerEl.innerText = '';
}

MakeCalendar.prototype.init = function () {
    this.firstDateInMonth = new Date(this.year, this.month - 1, 1);
    this.firstDayInMonth = this.firstDateInMonth.getDay();

    // const shiftFirstDay = this.firstDayInMonth === 0 ? 6 : this.firstDayInMonth - 1;
    const shiftFirstDay = (this.firstDayInMonth + 6) % 7;

    this.firstDisplayDate = new Date(this.year, this.month - 1, 1 - shiftFirstDay);

    this.lastDateInMonth = new Date(this.year, this.month, 0);
    this.lastDayInMonth = this.lastDateInMonth.getDay();

    const lastDayShift = (7 - this.lastDayInMonth) % 7;

    this.lastDisplayDate = new Date(this.year, this.month, lastDayShift);

    this.displayDates = [];

    for (
        const idxDate = new Date(this.firstDisplayDate);
        idxDate <= this.lastDisplayDate;
        idxDate.setDate( idxDate.getDate() + 1)
    ) {
        this.displayDates.push(new Date(idxDate));
    }
}

MakeCalendar.prototype.fill = function () {
    this.headerEl.innerText = this.getTitle();

    const daysEl = [];

    for (let i=0; i < this.displayDates.length; i++) {
        const dayEl = this.createDayElement(this.displayDates[i], this.month - 1);

        daysEl.push(dayEl);
    }

    this.daysEl.append(...daysEl);
}

MakeCalendar.prototype.createDayElement = function (elementDate, curentMonthNumber) {
    const rootElement = document.createElement('li');

    rootElement.innerText = elementDate.getDate();
    rootElement.className = 'calendar-day';
    rootElement.setAttribute('class', 'calendar-day');

    if (elementDate.getMonth() !== curentMonthNumber) {
        rootElement.classList.add('calendar-day--not-in-month');
    }

    return rootElement;
}

const calendar = new MakeCalendar('.test-calendar');
const calendar2 = new MakeCalendar('.second-calendar', 2020, 8);

console.log( 'calendar', calendar );
console.log( 'calendar2', calendar2 );











function makeCalendar(selector, year, month) {
    const MONTH_NAMES = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const calendar = {
        year: year,
        month,
        rootEl: document.querySelector(selector),
        clear: function () {
            calendar.daysEl.innerText = '';
            calendar.headerEl.innerText = '';
        },
        fill,
        init
    };

    calendar.headerEl = calendar.rootEl.querySelector('.calendar-header');
    calendar.daysEl = calendar.rootEl.querySelector('.calendar-days');

    calendar.currentDate = new Date();

    if (!year || !month) {
        calendar.year = calendar.currentDate.getFullYear();
        calendar.month = calendar.currentDate.getMonth() + 1;
    }

    calendar.clear();
    calendar.init();
    calendar.fill();

    function getTitle() {
        return MONTH_NAMES[calendar.month - 1] + ' ' + calendar.year;
    }

    function init() {
        calendar.firstDateInMonth = new Date(calendar.year, calendar.month - 1, 1);
        calendar.firstDayInMonth = calendar.firstDateInMonth.getDay();

        // const shiftFirstDay = calendar.firstDayInMonth === 0 ? 6 : calendar.firstDayInMonth - 1;
        const shiftFirstDay = (calendar.firstDayInMonth + 6) % 7;

        calendar.firstDisplayDate = new Date(calendar.year, calendar.month - 1, 1 - shiftFirstDay);

        calendar.lastDateInMonth = new Date(calendar.year, calendar.month, 0);
        calendar.lastDayInMonth = calendar.lastDateInMonth.getDay();

        const lastDayShift = (7 - calendar.lastDayInMonth) % 7;

        calendar.lastDisplayDate = new Date(calendar.year, calendar.month, lastDayShift);

        calendar.displayDates = [];

        for (
            const idxDate = new Date(calendar.firstDisplayDate);
            idxDate <= calendar.lastDisplayDate;
            idxDate.setDate( idxDate.getDate() + 1)
        ) {
            calendar.displayDates.push(new Date(idxDate));
        }
    }

    function fill() {
        calendar.headerEl.innerText = getTitle();

        const daysEl = [];

        for (let i=0; i < calendar.displayDates.length; i++) {
            const dayEl = createDayElement(calendar.displayDates[i], calendar.month - 1);

            daysEl.push(dayEl);
        }

        calendar.daysEl.append(...daysEl);
    }

    function createDayElement(elementDate, curentMonthNumber) {
        const rootElement = document.createElement('li');

        rootElement.innerText = elementDate.getDate();
        rootElement.className = 'calendar-day';
        rootElement.setAttribute('class', 'calendar-day');

        if (elementDate.getMonth() !== curentMonthNumber) {
            rootElement.classList.add('calendar-day--not-in-month');
        }

        return rootElement;
    }

    return calendar;
}

const calendarStandard = makeCalendar('.test-calendar');
const calendar2Standard = makeCalendar('.second-calendar', 2020, 8);

console.log( 'calendar', calendarStandard );
console.log( 'calendar2', calendar2Standard );
