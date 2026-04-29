import { useState } from "react";
import { ButtonForm, InputForm, Title } from "../Usable";
import type { Student } from "../Usable";
import Alert from "../Alert/Alert";

type FormProps = {
  onAdd: (student: Student) => void;
};

export default function Form({ onAdd }: FormProps) {
  const [name, setName] = useState("");
  const [yearLevel, setStudentYearLevel] = useState("");
  const [course, setCourse] = useState("");

  const [alert, setAlert] = useState<{
    type: "success" | "failed";
    message: string;
    visible: boolean;
  }>({
    type: "success",
    message: "",
    visible: false,
  });
  const showAlert = (type: "success" | "failed", message: string) => {
    setAlert({ type, message, visible: true });
    setTimeout(() => setAlert((prev) => ({ ...prev, visible: false })), 3000);
  };

  const handleSubmit = () => {
    const level = parseInt(yearLevel);

    if (!name.trim() || !yearLevel || !course.trim()) {
      showAlert("failed", "Please Fill all fields");
      return;
    }

    if (isNaN(level) || level < 1 || level > 4) {
      showAlert("failed", "Year Level must be between 1st Year and 4th Year");
      return;
    }
    const newStudent: Student = {
      id: crypto.randomUUID(),
      StudentName: name.trim(),
      StudentYearLevel: level,
      StudentCourse: course.trim(),
    };
    onAdd(newStudent);
    setName("");
    setStudentYearLevel("");
    setCourse("");
    showAlert("success", `${name.trim()} has been added`);
  };

  return (
    <>
      <Alert
        type={alert.type}
        message={alert.message}
        visible={alert.visible}
      />
      <div className="flex flex-col w-3xl p-12 rounded-2xl bg-white">
        <Title text="Student Form" />
        <div className="grid grid-cols-2 items-center gap-4 mb-6">
          <div className="col-span-2">
            <InputForm
              id="StudentName"
              type="text"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <InputForm
            id="StudentYearLevel"
            type="number"
            placeholder="Student Year Level"
            value={yearLevel}
            onChange={(e) => setStudentYearLevel(e.target.value)}
          />
          <InputForm
            id="StudentCourse"
            type="text"
            placeholder="Student Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>
        <div className="mt-auto ml-auto">
          <ButtonForm onclick={handleSubmit} variant="add">
            Add
          </ButtonForm>
        </div>
      </div>
    </>
  );
}
