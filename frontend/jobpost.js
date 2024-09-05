document.addEventListener('DOMContentLoaded', function () {
    // Handle form submission
    document.getElementById('jobPostForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const jobData = {
            jobTitle: document.getElementById('jobTitle').value,
            companyName: document.getElementById('companyName').value,
            location: document.getElementById('location').value,
            jobDescription: document.getElementById('jobDescription').value,
            requirements: document.getElementById('requirements').value,
            deadline: document.getElementById('deadline').value,
            referId: document.getElementById('referId').value,
            applicationLink: document.getElementById('applicationLink').value
        };

        const imageInput = document.getElementById('imageUpload');
        if (imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                jobData.image = e.target.result; // Base64 string of the image
                submitJobData(jobData);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            submitJobData(jobData);
        }
    });

    function submitJobData(jobData) {
        axios.post('http://localhost:5000/api/jobs', jobData)
            .then(response => {
                alert('Job posted successfully');
                window.location.href = 'AlumniHome.html';
                document.getElementById('jobPostForm').reset(); // Reset form after successful submission
            })
            .catch(error => {
                console.error('Error posting job:', error);
                alert('Error posting job');
            });
    }
});
