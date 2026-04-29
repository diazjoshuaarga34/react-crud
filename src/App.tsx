import { useState } from "react";
import Form from "./components/Form/Form.tsx";
import StudentTable from "./components/Table/StudentTable.tsx";
import type { Student } from "./components/Usable.tsx";

function App() {
  const [students, setStudents] = useState<Student[]>([]);

  const handleAdd = (student: Student) => {
    setStudents([...students, student]);
  };

  const handleEdit = (updated: Student) => {
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const handleDelete = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };
  return (
    <div>
      <div className="flex justify-center py-6">
        <Form onAdd={handleAdd} />
      </div>
      <div className="flex justify-center">
        <StudentTable
          students={students}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default App;
