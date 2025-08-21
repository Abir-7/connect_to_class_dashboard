import React from "react";

const FormButton = ({
  isLoading,
  btnText,
}: {
  isLoading: boolean;
  btnText: string;
}) => {
  return (
    <button
      type="submit"
      className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800"
    >
      {isLoading ? "Processing..." : btnText}
    </button>
  );
};

export default FormButton;
