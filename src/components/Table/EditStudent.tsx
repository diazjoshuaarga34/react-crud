import { useState, useEffect } from "react";
import { InputForm, ButtonForm, Title } from "../Usable";
import type { Student } from "../Usable";

type EditModalProps = {
  visible: boolean;
  student: Student | null;
  onSave: (updated: Student) => void;
  onClose: () => void;
  onAlert: (type: "success" | "failed", message: string) => void;
};

export default function EditModal({
  visible,
  student,
  onSave,
  onClose,
  onAlert,
}: EditModalProps) {
  const [name, setName] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    if (student) {
      setName(student.StudentName);
      setYearLevel(String(student.StudentYearLevel));
      setCourse(student.StudentCourse);
    }
  }, [student]);

  if (!visible) return null;

  const handleSave = () => {
    const level = parseInt(yearLevel);
    if (!name.trim() || !yearLevel || !course.trim()) {
      return;
    }
    if (isNaN(level) || level < 1 || level > 4) {
      onAlert("failed", "Year Level must be between 1st Year and 4th Year");
      return;
    }
    onSave({
      id: student!.id,
      StudentName: name.trim(),
      StudentYearLevel: parseInt(yearLevel),
      StudentCourse: course.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg shadow-blue-900 p-12 max-w-2xl w-full">
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
            onChange={(e) => setYearLevel(e.target.value)}
          />
          <InputForm
            id="StudentCourse"
            type="text"
            placeholder="Student Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>
        <div className="flex gap-2 justify-self-end">
          <ButtonForm onclick={handleSave} variant="add">
            Save
          </ButtonForm>
          <ButtonForm variant="cancelConfirmation" onclick={onClose}>
            Cancel
          </ButtonForm>
        </div>
      </div>
    </div>
  );
}
