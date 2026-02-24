//button toggle making
function toggleButton(value) {
    const allBtn = document.getElementById('all-btn');
    const interviewBtn = document.getElementById('interview-btn');
    const rejectedBtn = document.getElementById('rejected-btn');
    if (value === 'all-btn') {
        allBtn.classList.add('btn-primary');
        interviewBtn.classList.remove('btn-primary');
        rejectedBtn.classList.remove('btn-primary');
    } else if (value === 'interview-btn') {
        interviewBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-primary');
        rejectedBtn.classList.remove('btn-primary');
    } else if (value === 'rejected-btn') {
        rejectedBtn.classList.add('btn-primary');
        allBtn.classList.remove('btn-primary');
        interviewBtn.classList.remove('btn-primary');
    }
}

