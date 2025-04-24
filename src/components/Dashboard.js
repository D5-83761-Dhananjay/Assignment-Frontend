import PieChart from "./PiChart";
import { useSelector } from "react-redux";

const Dashboard = ({ childName }) => {
  const Data = useSelector((store) => store.category.items);

  const findChild = (childName) => {
    for (const category of Data) {
      const match = category.children.find((child) => child.name === childName);
      if (match) return match;
    }
  };

  const child = findChild(childName);

  if (!child) {
    return <div>No data found for "{childName}"</div>;
  }

  const data = child.quantity.map((item) => ({
    name: item.name,
    value: item.qty,
  }));

  return (
    <div className="w-full h-full">
      <h1>{childName}</h1>
      <PieChart data={data} />
    </div>
  );
};

export default Dashboard;
