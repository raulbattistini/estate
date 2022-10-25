import { IObj } from "../../interfaces";

export const Checkbox = ({ obj }: IObj) => {
  return (
    <>
      <input
        type="checkbox"
        id={`custom-checkbox-${obj!.index}`}
        name="intention"
        className="text-white rounded-md pl-2 checkbox justify-between flex"
        value={obj.name}
      />
  ⠀{obj.name}
    </>
  );
};
