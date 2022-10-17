import { IObj } from "../../interfaces";

export const Checkbox = ({ obj }: IObj) => {
  return (
    <>
      <input
        type="checkbox"
        id={`custom-checkbox-${obj!.index}`}
        name={obj.name}
        className="text-white rounded-md pl-2 checkbox justify-between flex"
      />
  ⠀{obj.name}
    </>
  );
};
