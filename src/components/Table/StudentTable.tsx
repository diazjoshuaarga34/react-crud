import { useState, useEffect } from "react";
import type { Student } from "../Usable";
import { Title, ButtonForm } from "../Usable";
import Confirm from "../Alert/Confirmation";
import Alert from "../Alert/Alert";
import EditModal from "./EditStudent";

type StudentTableProps = {
  students: Student[];
  onDelete: (id: string) => void;
  onEdit: (updated: Student) => void;
};

export default function StudentTable({
  students,
  onDelete,
  onEdit,
}: StudentTableProps) {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [edit, setEdit] = useState<Student | null>(null);

  const [confirm, setConfirm] = useState<{
    visible: boolean;
    studentId: string;
    studentName: string;
  }>({
    visible: false,
    studentId: "",
    studentName: "",
  });
  const [alert, setAlert] = useState<{
    type: "success" | "failed";
    message: string;
    visible: boolean;
  }>({ type: "success", message: "", visible: false });

  const showAlert = (type: "success" | "failed", message: string) => {
    setAlert({ type, message, visible: true });
    setTimeout(() => setAlert((prev) => ({ ...prev, visible: false })), 3000);
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setQuery(search);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const filtered = students.filter((s) => {
    const searchTerm = query.toLowerCase();

    const level = s.StudentYearLevel;
    const suffix =
      level === 1 ? "st" : level === 2 ? "nd" : level === 3 ? "rd" : "th";
    const yearWithSuffix = `${level}${suffix}`.toLowerCase();
    const fullYearText = `${level}${suffix} year`.toLowerCase();

    return (
      s.StudentName.toLowerCase().includes(searchTerm) ||
      s.StudentCourse.toLowerCase().includes(searchTerm) ||
      s.StudentYearLevel.toString().includes(searchTerm) ||
      yearWithSuffix.includes(searchTerm) ||
      fullYearText.includes(searchTerm)
    );
  });

  return (
    <>
      <EditModal
        visible={!!edit}
        student={edit}
        onSave={(updated) => {
          onEdit(updated);
          setEdit(null);
          showAlert("success", `${updated.StudentName} has been updated.`);
        }}
        onClose={() => setEdit(null)}
        onAlert={showAlert}
      />
      <Alert
        type={alert.type}
        message={alert.message}
        visible={alert.visible}
      />
      <Confirm
        visible={confirm.visible}
        message={`You are about to delete ${confirm.studentName}. This cannot be undone.`}
        onConfirm={() => {
          onDelete(confirm.studentId);
          showAlert("success", `${confirm.studentName} has been deleted.`);
          setConfirm({ visible: false, studentId: "", studentName: "" });
        }}
        onCancel={() =>
          setConfirm({ visible: false, studentId: "", studentName: "" })
        }
      />
      <div className="w-7xl max-w-7xl rounded-2xl p-12 my-12 bg-white">
        <Title text="Student Table" />

        <div className="relative max-w-sm mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-blue-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full p-3 pl-10 text-sm font-medium border shadow-sm shadow-blue-400 rounded-xl bg-neutral-50 focus:ring hover:border-blue-400 focus:ring-blue-400 focus:border-transparent outline-none transition"
            placeholder="Search for anything..."
          ></input>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-sm shadow-blue-700">
          <table className="w-full text-sm text-center">
            <thead className="bg-indigo-700 text-white">
              <tr>
                <th className="p-6 font-semibold text-lg">Name</th>
                <th className="p-6 font-semibold text-lg">Year Level</th>
                <th className="p-6 font-semibold text-lg">Course</th>
                <th className="p-6 font-semibold text-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-6">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-gray-500 text-center text-lg py-25"
                  >
                    {students.length === 0
                      ? "No students yet. Fill the form above to add one!"
                      : "No results found."}
                  </td>
                </tr>
              ) : (
                filtered.map((student) => (
                  <tr key={student.id} className="hover:bg-blue-50">
                    <td className="p-6 font-medium">{student.StudentName}</td>
                    <td className="p-6 font-medium">
                      {student.StudentYearLevel}
                      {student.StudentYearLevel === 1
                        ? "st"
                        : student.StudentYearLevel === 2
                          ? "nd"
                          : student.StudentYearLevel === 3
                            ? "rd"
                            : "th"}{" "}
                      Year
                    </td>
                    <td className="p-6 font-medium">{student.StudentCourse}</td>
                    <td className="p-6 grid grid-cols-2">
                      <ButtonForm
                        variant="editTable"
                        onclick={() => setEdit(student)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                        Edit
                      </ButtonForm>
                      <ButtonForm
                        variant="deleteTable"
                        onclick={() =>
                          setConfirm({
                            visible: true,
                            studentId: student.id,
                            studentName: student.StudentName,
                          })
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        Delete
                      </ButtonForm>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
