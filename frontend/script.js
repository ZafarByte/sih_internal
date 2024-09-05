document.addEventListener('DOMContentLoaded', function () {
    let alumni = [];

    // Fetch alumni data
    axios.get('http://localhost:5000/api/alumni')
        .then(response => {
            alumni = response.data;
            displayAlumni(alumni);

            // Event listeners for each search input
            document.getElementById('nameSearch').addEventListener('input', filterAlumni);
            document.getElementById('yearSearch').addEventListener('input', filterAlumni);
            document.getElementById('employerSearch').addEventListener('input', filterAlumni);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    // Function to filter and display alumni
    function filterAlumni() {
        const nameQuery = document.getElementById('nameSearch').value.toLowerCase();
        const yearQuery = document.getElementById('yearSearch').value;
        const employerQuery = document.getElementById('employerSearch').value.toLowerCase();

        const filteredAlumni = alumni.filter(alumnus =>
            alumnus.name.toLowerCase().includes(nameQuery) &&
            (!yearQuery || alumnus.graduationYear.toString().includes(yearQuery)) &&
            alumnus.currentEmployer.toLowerCase().includes(employerQuery)
        );

        displayAlumni(filteredAlumni);
    }

    // Function to display alumni in the table
    function displayAlumni(alumniList) {
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = ''; // Clear existing rows

        // Check if alumni list is empty
        if (alumniList.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">No alumni found</td></tr>';
            return;
        }

        alumniList.forEach(alumnus => {
            const row = document.createElement('tr');
            row.classList.add('table-row', 'border-b', 'border-gray-200');

            row.innerHTML = `
                <td class="px-6 py-4 font-medium text-gray-900">${alumnus.name}</td>
                <td class="px-6 py-4">${alumnus.degree}</td>
                <td class="px-6 py-4">${alumnus.graduationYear}</td>
                <td class="px-6 py-4">${alumnus.stream}</td>
                <td class="px-6 py-4">
                    <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">${alumnus.currentEmployer}</span>
                </td>
                <td class="px-6 py-4">${alumnus.jobTitle}</td>
            `;
            tbody.appendChild(row);
        });
    }
});
