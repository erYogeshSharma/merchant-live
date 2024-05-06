import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Card } from "../ui/card";
import "./_text-editor.css";
const TextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) => {
  const modules = {
    toolbar: [
      [
        {
          size: ["small", false, "large", "huge"],
        },
      ],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [
        "link",
        // , "image"
      ],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#FB6514",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#667085",
            "#475467",
            "#344054",
            "#1D2939",
            "#101828",
            "custom-color",
          ],
        },
      ],
    ],
  };

  const formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    // "image",
    "align",
    "size",
  ];

  const handleProcedureContentChange = (content: string) => {
    console.log(content);
  };

  return (
    <div>
      <div>
        <Card>
          <div>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={value}
              placeholder="write your content ...."
              onChange={handleProcedureContentChange}
            ></ReactQuill>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TextEditor;
