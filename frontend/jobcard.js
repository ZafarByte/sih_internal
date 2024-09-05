document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch job data and render job cards
    function fetchJobs() {
        axios.get('http://localhost:5000/api/jobs')
            .then(response => {
                const jobs = response.data;
                const jobContainer = document.getElementById('jobContainer');
                jobContainer.innerHTML = ''; // Clear existing content

                jobs.forEach(job => {
                    const jobCard = document.createElement('div');
                    jobCard.className = 'w-full md:w-1/3 px-4 mb-8';
                    jobCard.innerHTML = `
                        <div class="bg-white rounded-lg shadow-lg flex flex-col overflow-hidden items-center pt-20">
                            <img src="${job.image}" alt="${job.companyName} Logo" class="w-[150px] h-[150px] object-cover">
                            <div class="p-6 flex-grow text-center">
                                <h3 class="text-xl font-bold text-gray-900">${job.jobTitle}</h3>
                                <p class="text-gray-700 mt-2">${job.companyName}</p>
                                <p class="text-gray-500 mt-1">Location: ${job.location}</p>
                                <p class="text-gray-500 mt-1">Deadline: <span class="font-semibold">${new Date(job.deadline).toLocaleDateString()}</span></p>
                                <p class="text-gray-500 mt-1">Referral Code: <span class="font-semibold">${job.referId}</span></p>
                            </div>
                            <div class="p-6 bg-gray-50 w-full">
                                <a href="${job.applicationLink}" class="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500">
                                    Apply Now
                                </a>
                            </div>
                        </div>
                    `;
                    jobContainer.appendChild(jobCard);
                });
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
    }

    // Fetch jobs when the page loads
    fetchJobs();
});
