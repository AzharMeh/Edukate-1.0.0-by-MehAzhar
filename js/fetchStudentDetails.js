

const fetchStudentDetails = (id) => {   
    const data = studentData();
    const rollNo = id.trim();
    const student = data.find(s => s.rollNo === rollNo);

    if (student) {
        const studentDetails = document.getElementById("studentDetails");
        
        // Generate result images HTML
        const resultImagesHtml = Object.entries(student["result_images"]).map(([year, value]) => {
            if (value === "Not Issued") {
                return `<li><strong>${year}:</strong> Not Issued</li>`;
            } else {
                const imagePath = value.replace(/\\/g, "/"); // convert Windows path
                const fileName = imagePath.split("/").pop();
                return `
                    <li class="mb-2">
                        <strong>${year}:</strong><br>
                        <img src="${imagePath}" alt="Result ${year}" class="img-fluid my-2 border" style="max-width:300px;"><br>
                        <a href="${imagePath}" download="${fileName}" class="btn btn-sm btn-success mt-2">Download ${year} Result</a>
                    </li>`;
            }
        }).join('');

        // Inject student data + images into the page
        studentDetails.innerHTML = `
            <h2 class="text-center my-4">Student Details</h2>
            <table class="table table-bordered table-striped table-hover">
                <tbody>
                    <tr><th>Roll Number</th><td>${student.rollNo}</td></tr>
                    <tr><th>Name</th><td>${student.name}</td></tr>
                    <tr><th>Father's Name</th><td>${student.fatherName}</td></tr>
                    <tr><th>Course</th><td>${student.course}</td></tr>
                    <tr><th>Address</th><td>${student.address}</td></tr>
                    <tr><th>Gender</th><td>${student.gender}</td></tr>
                    <tr><th>Admission Year</th><td>${student.admissionYear}</td></tr>
                    <tr><th>Date of Birth</th><td>${student.dob}</td></tr>
                    <tr><th>Academic Results</th><td>
                        <ul class="list-unstyled mb-0">
                            ${Object.entries(student.percentage).map(([year, grade]) =>
                                `<li><strong>${year}:</strong> ${grade}</li>`).join('')}
                        </ul>
                    </td></tr>
                    <tr><th>Result Images</th><td>
                        <ul class="list-unstyled mb-0">
                            ${resultImagesHtml}
                        </ul>
                    </td></tr>
                </tbody>
            </table>
        `;
    } else {
        document.getElementById("studentDetails").innerHTML = `
            <div class="alert alert-danger text-center">Student not found for Roll No: ${rollNo}</div>
        `;
    }
};
