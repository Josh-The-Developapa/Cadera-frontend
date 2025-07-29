import React from "react";
import { GraduationCap, ChartPie } from "lucide-react";
import { NavLink } from "react-router-dom";

const topClasses = [
  { rank: 1, name: "P7P", average: 75.1 },
  { rank: 2, name: "P7P", average: 75.1 },
  { rank: 3, name: "P7P", average: 75.1 },
  { rank: 4, name: "P7P", average: 75.1 },
  { rank: 5, name: "P7P", average: 75.1 },
  { rank: 6, name: "P7P", average: 75.1 },
  { rank: 7, name: "P7P", average: 75.1 },
  { rank: 8, name: "P7P", average: 75.1 },
];

const TopClassesCard = () => {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        width: "234px",
        maxWidth: "300px",
        minWidth: "234px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: "400",
          color: "#1f2937",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        <GraduationCap size={20} />
        <span>Top Classes</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        <table
          style={{
            width: "100%",
            borderSpacing: "0 4px",
            fontSize: "13px",
            borderCollapse: "separate",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#6b7280",
                  borderBottom: "1px solid hsl(220, 13%, 91%)",
                  padding: "8px 4px",
                  textAlign: "center",
                }}
              >
                Class
              </th>
              <th
                style={{
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "#6b7280",
                  borderBottom: "1px solid hsl(220, 13%, 91%)",
                  padding: "8px 4px",
                  textAlign: "center",
                }}
              >
                Average
              </th>
            </tr>
          </thead>
          <tbody>
            {topClasses.map((item, index) => {
              const baseColor = index % 2 === 0 ? "#F6F6F6" : "#F6FCFD";
              const hoverColor =
                index % 2 === 0 ? "hsla(0, 0%, 85%, 1)" : "hsla(189, 64%, 85%, 1)";

              return (
                <tr
                  key={`class-${item.rank}`}
                  style={{
                    backgroundColor: baseColor,
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = baseColor)}
                >
                  <td
                    style={{
                      fontSize: "14px",
                      fontWeight: "300",
                      color: "#111827",
                      padding: "6px 8px",
                      height: "32px",
                    }}
                  >
                    <span
                      style={{
                        color: "#404040",
                        borderRadius: "8px",
                        padding: "2px 6px",
                        fontSize: "14px",
                        fontWeight: "300",
                        display: "inline-block",
                        textAlign: "center",
                      }}
                    >
                      {item.rank}.
                    </span>{" "}
                    {item.name}
                  </td>
                  <td
                    style={{
                      fontSize: "14px",
                      fontWeight: "300",
                      color: "#111827",
                      padding: "6px 8px",
                      textAlign: "center",
                      height: "32px",
                    }}
                  >
                    {item.average}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
        <NavLink
          to="analytics"
          style={{
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#6b7280",
            fontWeight: "400",
            fontSize: "14px",
            background: "transparent",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <ChartPie size={16} /> Go To Analytics
        </NavLink>
      </div>
    </div>
  );
};

export default TopClassesCard;

