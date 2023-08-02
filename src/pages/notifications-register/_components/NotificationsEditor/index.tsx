import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface NotificationsEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const NotificationsEditor: React.FC<NotificationsEditorProps> = ({
  value,
  onChange,
}) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const handleChange = (content: string) => {
    onChange(content);
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: 1 }, { header: 2 }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ align: [] }],

        ["link"],
        ["clean"],
      ],
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "indent",
    "direction",
    "align",
    "link",
    "image",
  ];

  return (
    <div className="editor-container">
      <ReactQuill
        ref={(ref) => (quillRef.current = ref)}
        theme="snow"
        value={value}
        style={{
          height: "40vh",
          marginBottom: "50px",
        }}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default NotificationsEditor;
