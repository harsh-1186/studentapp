import React, { useState } from 'react';

function StudentAdmin() {
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState(null);

    async function showdata(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const sid = formData.get("id");

        try {
            const response = await fetch("http://localhost:3005/admin/show", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: sid })
            });

            const res = await response.json();

            if (res.msg) {
                setStudentData(res.msg);
                setError(null);
            } else {
                setStudentData(null);
                setError("No student found or error in response");
            }
        } catch (err) {
            console.error("Error fetching student data:", err);
            setError(`Fetch error: ${err.message}`); // ✅ Using err properly here
            setStudentData(null);
        }
    }

    return (
        <div>
            <div style={{ backgroundColor: 'brown', color: 'white', fontSize: "25px", margin: "20px", padding: "10px" }}>
                Student Admin
            </div>
            <form onSubmit={showdata} style={{ marginBottom: "20px" }}>
                <input type="text" name="id" placeholder="Enter ID" required />
                <button type="submit" style={{ marginLeft: "10px" }}>Search Student</button>
            </form>

            {error && <div style={{ color: 'red' }}><strong>Error:</strong> {error}</div>}

            {studentData && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Student Data:</h3>
                    <pre>{JSON.stringify(studentData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default StudentAdmin;
