
import { useEffect, useState } from "react";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Unable to load student records.");
      }

      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      {/* Header */}
      <header className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-700">
            Student Portal
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Student Directory
          </h1>

          <p className="mt-3 text-slate-600">
            Explore student records retrieved from a dummy API.
          </p>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-white bg-white p-5 shadow-lg">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-3xl text-white">
            🎓
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Records</p>
            <p className="text-3xl font-black text-indigo-700">
              {students.length}
            </p>
          </div>
        </div>
      </header>

      {/* Loading */}
      {loading && (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl bg-white shadow-lg">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
          <p className="mt-5 font-semibold text-slate-600">
            Fetching student data...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-lg">
          <p className="text-lg font-bold text-red-600">{error}</p>
          <button
            onClick={fetchStudents}
            className="mt-5 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Student List */}
      {!loading && !error && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">
              All Students
            </h2>

            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow">
              {students.length} students
            </span>
          </div>

          {students.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center text-slate-500 shadow">
              No student records found.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                />
              ))}
            </div>
          )}
        </>
      )}

      <footer className="mt-12 text-center text-sm text-slate-500">
        Built with React, Fetch API & Tailwind CSS
      </footer>
    </div>
  );
}

function StudentCard({ student }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500" />

      <div className="p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-black text-white shadow-lg">
            {student.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="break-words text-xl font-extrabold text-slate-900">
              {student.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-indigo-600">
              Student ID: {student.id}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50">
              ✉️
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Email Address
              </p>
              <p className="break-all text-sm text-slate-700">
                {student.email}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50">
              📞
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Phone Number
              </p>
              <p className="break-words text-sm text-slate-700">
                {student.phone}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
              🏢
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Company
              </p>
              <p className="break-words text-sm text-slate-700">
                {student.company?.name || "Not available"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Address
          </p>
          <p className="mt-2 text-sm font-medium text-slate-700">
            {student.address?.street}, {student.address?.city}
          </p>
        </div>
      </div>
    </article>
  );
}

export default StudentList;
