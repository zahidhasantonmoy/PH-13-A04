// variables array making as conceptual session

let interviewList = [];
let rejectedList = [];
let currentFilter = 'all-btn';

// get the value  by element id 

const totalCount = document.getElementById('totalCount');
const interviewCountDisplay = document.getElementById('interviewCountDisplay');
const rejectedCountDisplay = document.getElementById('rejectedCountDisplay');
const jobsCountLabel = document.getElementById('jobsCount');
const allCards = document.getElementById('allCards');
const filteredSection = document.getElementById('filtered-section');
const noJobsContent = document.getElementById('no-jobs-content');



// toggle button abar edit 

function toggleButton(value) {
    const allBtn = document.getElementById('all-btn');
    const interviewBtn = document.getElementById('interview-btn');
    const rejectedBtn = document.getElementById('rejected-btn');
    
    currentFilter = value;

    if (value === 'all-btn') {
        allBtn.classList.add('btn-primary');
        interviewBtn.classList.remove('btn-primary');
        rejectedBtn.classList.remove('btn-primary');
        allCards.classList.remove('hidden');
        filteredSection.classList.add('hidden');
    } else if (value === 'interview-btn') {
        interviewBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-primary');
        rejectedBtn.classList.remove('btn-primary');
        allCards.classList.add('hidden');
        filteredSection.classList.remove('hidden');
        renderFilteredList('INTERVIEW');
    } else if (value === 'rejected-btn') {
        rejectedBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-primary');
        interviewBtn.classList.remove('btn-primary');
        allCards.classList.add('hidden');
        filteredSection.classList.remove('hidden');
        renderFilteredList('REJECTED');
    }
    calculateCount();
}

function calculateCount() {
    const total = allCards.querySelectorAll('.job-card').length;
    totalCount.innerText = total;
    interviewCountDisplay.innerText = interviewList.length;
    rejectedCountDisplay.innerText = rejectedList.length;

    let currentShown = 0;
    if (currentFilter === 'all-btn') {
        currentShown = total;
    } else if (currentFilter === 'interview-btn') {
        currentShown = interviewList.length;
    } else {
        currentShown = rejectedList.length;
    }
    
    jobsCountLabel.innerText = currentShown;
    
    if (currentShown === 0) {
        noJobsContent.classList.remove('hidden');
        if (currentFilter !== 'all-btn') filteredSection.classList.add('hidden');
    } else {
        noJobsContent.classList.add('hidden');
        if (currentFilter !== 'all-btn') filteredSection.classList.remove('hidden');
    }
}

document.addEventListener('click', function (event) {
    const card = event.target.closest('.job-card');
    if (!card) return;

    const companyName = card.querySelector('.companyName').innerText;
    
    if (event.target.classList.contains('interview-btn')) {
        const cardData = extractCardData(card, 'INTERVIEW');
        updateBadge(card, 'INTERVIEW', 'bg-green-100 text-green-700');
        if (!interviewList.find(i => i.companyName === companyName)) interviewList.push(cardData);
        rejectedList = rejectedList.filter(i => i.companyName !== companyName);
        state();
    } 
    else if (event.target.classList.contains('rejected-btn')) {
        const cardData = extractCardData(card, 'REJECTED');
        updateBadge(card, 'REJECTED', 'bg-red-100 text-red-700');
        if (!rejectedList.find(i => i.companyName === companyName)) rejectedList.push(cardData);
        interviewList = interviewList.filter(i => i.companyName !== companyName);
        state();
    }
    else if (event.target.closest('.delete-btn')) {
        interviewList = interviewList.filter(i => i.companyName !== companyName);
        rejectedList = rejectedList.filter(i => i.companyName !== companyName);
        const original = Array.from(allCards.children).find(c => c.querySelector('.companyName').innerText === companyName);
        if (original) original.remove();
        state();
    }
});

function extractCardData(card, status) {
    return {
        companyName: card.querySelector('.companyName').innerText,
        position: card.querySelector('.position').innerText,
        location: card.querySelector('.location').innerText,
        type: card.querySelector('.type').innerText,
        salary: card.querySelector('.salary').innerText,
        description: card.querySelector('.description').innerText,
        status: status
    };
}

function updateBadge(card, text, classes) {
    const badge = card.querySelector('.status-badge');
    badge.innerText = text;
    badge.className = `status-badge badge p-4 font-bold border-none ${classes}`;
}

function state() {
    if (currentFilter === 'interview-btn') renderFilteredList('INTERVIEW');
    if (currentFilter === 'rejected-btn') renderFilteredList('REJECTED');
    calculateCount();
}

function renderFilteredList(statusType) {
    filteredSection.innerHTML = '';
    const list = statusType === 'INTERVIEW' ? interviewList : rejectedList;
    const badgeClass = statusType === 'INTERVIEW' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';

    list.forEach(item => {
        const div = document.createElement('div');
        div.className = 'job-card card flex flex-col md:flex-row justify-between border-2 border-gray-300 p-6 rounded-lg bg-base-100 shadow-sm';
        div.innerHTML = `
            <div class="w-full">
                <h2 class="companyName text-xl font-bold">${item.companyName}</h2>
                <p class="position text-gray-600">${item.position}</p>
                <ul class="flex flex-wrap gap-4 my-4 text-sm text-gray-500">
                    <li class="location"><i class="fa-solid fa-location-dot mr-1"></i>${item.location}</li>
                    <li class="type"><i class="fa-solid fa-briefcase mr-1"></i>${item.type}</li>
                    <li class="salary"><i class="fa-solid fa-money-bill-wave mr-1"></i>${item.salary}</li>
                </ul>
                <div class="status-badge badge ${badgeClass} p-4 font-bold border-none">${item.status}</div>
                <p class="description text-sm mt-4 text-gray-600 leading-relaxed">${item.description}</p>
                <div class="flex gap-4 mt-6">
                    <button class="interview-btn btn btn-outline btn-success btn-sm">Interview</button>
                    <button class="rejected-btn btn btn-outline btn-error btn-sm">Rejected</button>
                </div>
            </div>
            <button class="delete-btn text-gray-400 hover:text-red-600 p-2"><i class="fa-solid fa-trash-can"></i></button>`;
        filteredSection.appendChild(div);
    });
}

calculateCount();