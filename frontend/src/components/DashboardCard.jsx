function DashboardCard({ title, value }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        margin: "10px",
        borderRadius: "8px",
        width: "200px"
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}

export default DashboardCard;