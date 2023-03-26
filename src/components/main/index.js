import "../../styles/main/index.css";
import Sidebar from "../sidebar/Sidebar";
import TableView from "../TableView/TableView";
export default function Index() {
  return (
    <div>
      <TableView />
      <Sidebar />
    </div>
  );
}
