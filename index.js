// const form = document.getElementById('registration-form');
// const recordsTableBody = document.getElementById('records-table-body');

// form.addEventListener('submit', function(event) {
//     event.preventDefault();

//     const studentName = document.getElementById('student-name').value;
//     const studentId = document.getElementById('student-id').value;
//     const emailId = document.getElementById('email-id').value;
//     const contactNo = document.getElementById('contact-no').value;

//     const newRow = document.createElement('tr');

//     newRow.innerHTML = `
//         <td>${studentName}</td>
//         <td>${studentId}</td>
//         <td>${emailId}</td>
//         <td>${contactNo}</td>
//     `;

//     recordsTableBody.appendChild(newRow);

//     form.reset();
// });

document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('registration-form');
    const recordsTableBody = document.getElementById('records-table-body');

    function saveToLocalStorage(records) {
        localStorage.setItem('studentRecords', JSON.stringify(records));
    }

    function loadFromLocalStorage() {
        const records = JSON.parse(localStorage.getItem('studentRecords')) || [];
        return records;
    }

    function addRow(student) {
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit-btn" onclick="editRow(this)">Edit</button>
                <button class="delete-btn" onclick="deleteRow(this)">Delete</button>
            </td>
        `;

        recordsTableBody.appendChild(newRow);
    }

    function refreshTable() {
        recordsTableBody.innerHTML = '';
        const records = loadFromLocalStorage();
        records.forEach(student => addRow(student));
    }

    window.editRow = function(button) {
        const row = button.parentNode.parentNode;
        const cells = row.getElementsByTagName('td');

        document.getElementById('student-name').value = cells[0].innerText;
        document.getElementById('student-id').value = cells[1].innerText;
        document.getElementById('email-id').value = cells[2].innerText;
        document.getElementById('contact-no').value = cells[3].innerText;

        row.remove();
        saveToLocalStorage(loadFromLocalStorage().filter(student => student.id !== cells[1].innerText));
    }

    window.deleteRow = function(button) {
        const row = button.parentNode.parentNode;
        const cells = row.getElementsByTagName('td');
        row.remove();
        saveToLocalStorage(loadFromLocalStorage().filter(student => student.id !== cells[1].innerText));
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const studentName = document.getElementById('student-name').value;
        const studentId = document.getElementById('student-id').value;
        const emailId = document.getElementById('email-id').value;
        const contactNo = document.getElementById('contact-no').value;

        if (!/^[a-zA-Z\s]+$/.test(studentName)) {
            alert('Student Name must contain only letters.');
            return;
        }

        if (!/^\d+$/.test(studentId)) {
            alert('Student ID must contain only numbers.');
            return;
        }

        if (!/^\d+$/.test(contactNo)) {
            alert('Contact No must contain only numbers.');
            return;
        }

        const student = {
            name: studentName,
            id: studentId,
            email: emailId,
            contact: contactNo
        };

        addRow(student);
        const records = loadFromLocalStorage();
        records.push(student);
        saveToLocalStorage(records);

        form.reset();
    });

    refreshTable();
});