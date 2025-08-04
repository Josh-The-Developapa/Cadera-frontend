import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  CheckCircle2,
  CheckCheck,
  ClipboardList,
} from "lucide-react";

const ToDoCard = () => {
  const [newTask, setNewTask] = useState("");
  const [todoItems, setTodoItems] = useState(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [completedItems, setCompletedItems] = useState(() => {
    const saved = localStorage.getItem("completedTasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(todoItems));
  }, [todoItems]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedItems));
  }, [completedItems]);

  const addTask = () => {
    if (newTask.trim()) {
      const newId = Date.now();
      setTodoItems([...todoItems, { id: newId, text: newTask.trim(), completed: false }]);
      setNewTask("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  const toggleTask = (id) => {
    const task = todoItems.find((item) => item.id === id);
    if (task) {
      setTodoItems(todoItems.filter((item) => item.id !== id));
      setCompletedItems([...completedItems, { ...task, completed: true }]);
    }
  };

  const uncompleteTask = (id) => {
    const task = completedItems.find((item) => item.id === id);
    if (task) {
      setCompletedItems(completedItems.filter((item) => item.id !== id));
      setTodoItems([...todoItems, { ...task, completed: false }]);
    }
  };

  const deleteTask = (id) => {
    setTodoItems(todoItems.filter((item) => item.id !== id));
    setCompletedItems(completedItems.filter((item) => item.id !== id));
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        width: "100%",
        maxWidth: "380px",
        minWidth: "360px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "500", color: "#1f2937", margin: 0 }}>
          <div className="flex flex-row gap-[5px] justify-center items-center text-[14px] font-[400]">
            <ClipboardList size={16} /> To Do
            <span style={{ color: "#9ca3af", fontWeight: "400" }}> ({todoItems.length})</span>
          </div>
        </h3>
      </div>

      <div style={{ position: "relative", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Describe a Task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            width: "100%",
            padding: "10px 40px 10px 16px",
            border: "1px solid #404040",
            borderRadius: "5px",
            fontSize: "14px",
            color: "#404040",
          }}
        />
        <Plus
          size={20}
          onClick={addTask}
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#6b7280",
            cursor: "pointer",
          }}
        />
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {todoItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              padding: "12px 16px",
              marginBottom: "8px",
              backgroundColor: "#f9fafb",
              borderRadius: "5px",
              border: "1px solid #f3f4f6",
            }}
          >
            <div
              onClick={() => toggleTask(item.id)}
              style={{
                width: "20px",
                height: "20px",
                border: "2px solid #d1d5db",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            ></div>
            <span style={{ fontSize: "14px", color: "#374151", flex: 1 }}>{item.text}</span>
            <Trash2
              size={18}
              onClick={() => deleteTask(item.id)}
              style={{ color: "#9ca3af", cursor: "pointer" }}
            />
          </div>
        ))}

        {completedItems.length > 0 && (
          <div style={{ marginTop: "24px" }}>
            <h4 style={{ fontSize: "14px", fontWeight: "500", color: "#1f2937", marginBottom: "12px" }}>
              <CheckCheck size={16} /> Completed
              <span style={{ color: "#9ca3af", fontWeight: "400" }}> ({completedItems.length})</span>
            </h4>
            {completedItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "12px 16px",
                  marginBottom: "8px",
                  backgroundColor: "#f9fafb",
                  borderRadius: "5px",
                  opacity: 0.7,
                }}
              >
                <CheckCircle2
                  size={20}
                  onClick={() => uncompleteTask(item.id)}
                  style={{ color: "#10b981", cursor: "pointer" }}
                />
                <span
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    flex: 1,
                    textDecoration: "line-through",
                  }}
                >
                  {item.text}
                </span>
                <Trash2
                  size={18}
                  onClick={() => deleteTask(item.id)}
                  style={{ color: "#9ca3af", cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToDoCard;

