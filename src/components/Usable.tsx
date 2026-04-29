type InputDesign = {
  id: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputForm({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
}: InputDesign) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      autoComplete="off"
      onChange={onChange}
      className="no-spinner w-full p-2 bg-neutral-50 rounded-md border-0 border-b-2 border-gray-400 focus:border-indigo-800 outline-none mb-4 text-lg"
    />
  );
}

type TitleDesign = {
  text: string;
};

export function Title({ text }: TitleDesign) {
  return <h1 className="text-2xl font-bold mb-6">{text}</h1>;
}

type ButtonDesign = {
  children: React.ReactNode;
  variant?:
    | "add"
    | "deleteTable"
    | "editTable"
    | "deleteConfirmation"
    | "cancelConfirmation";
  onclick?: () => void;
};

export function ButtonForm({
  children,
  onclick,
  variant = "add",
}: ButtonDesign) {
  const styles = {
    add: "px-4 py-2 text-md text-white font-semibold bg-blue-600 shadow-sm shadow-blue-900 cursor-pointer transition duration-300 hover:shadow-lg hover:bg-white hover:text-blue-700 rounded-lg",
    editTable:
      "flex items-center m-auto gap-2 px-4 py-2 text-md text-white font-semibold bg-blue-600 shadow-sm shadow-blue-900 cursor-pointer transition duration-300 hover:shadow-lg hover:bg-white hover:text-blue-700 rounded-lg",
    deleteTable:
      "flex items-center m-auto gap-2 px-4 py-2 text-md text-white font-semibold bg-red-600 shadow-sm shadow-blue-900 cursor-pointer transition duration-300 hover:shadow-lg hover:bg-white hover:text-red-700 rounded-lg",
    deleteConfirmation:
      "px-4 py-2 text-md text-white font-semibold bg-red-600 shadow-sm shadow-blue-900 cursor-pointer transition duration-300 hover:shadow-lg hover:bg-white hover:text-red-700 rounded-lg",
    cancelConfirmation:
      "px-4 py-2 text-md text-white font-semibold bg-gray-500 shadow-sm shadow-blue-900 cursor-pointer transition duration-300 hover:shadow-lg hover:bg-white hover:text-gray-700 rounded-lg",
  };

  return (
    <button onClick={onclick} className={styles[variant]}>
      {children}
    </button>
  );
}

export type Student = {
  id: string;
  StudentName: string;
  StudentYearLevel: number;
  StudentCourse: string;
};
