import { useOutletContext } from "react-router-dom";

function Banks() {
  const { dark } = useOutletContext();

  return (
    <div>
      <h1 style={{ color: dark ? "white" : "red" }}>صفحة البنوك</h1>
      {/* المحتوى بتاعك هنا */}
    </div>
  );
}

export default Banks;
