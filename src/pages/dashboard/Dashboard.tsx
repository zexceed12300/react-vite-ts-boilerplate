import { useState } from "react";
import { DataTable } from "../../components/DataTable";
import { TbEdit, TbTrash } from "react-icons/tb";
import dayjs from "dayjs";


const Dashboard = () => {

	const [showModal, setShowModal] = useState<{
    display: "account" | "delete" | "detail";
    id: number | null;
  } | null>(null);

	return (
		<div>
			<div className="flex flex-col gap-3 bg-white m-6 p-3 rounded-xl shadow-sm">
          <DataTable
            queryKey={["users"]}
            apiURL="/user"
            dataPath="users"
            columns={[
              {
                title: "#",
                render: (_data, _row, pageInfo, index) =>
                  pageInfo.page * pageInfo.size + index + 1,
                orderable: false,
              },
              {
                title: "Action",
                data: "id",
                render: (data) => (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setShowModal({
                          display: "account",
                          id: data,
                        })
                      }
                      className="w-fit p-0.5 text-slate-400 hover:text-sky-500">
                      <TbEdit size={20} />
                    </button>
                    <button
                      onClick={() =>
                        setShowModal({
                          display: "delete",
                          id: data,
                        })
                      }
                      className="w-fit p-0.5 text-slate-400 hover:text-red-500">
                      <TbTrash size={20} />
                    </button>
                  </div>
                ),
                orderable: false,
              },
              { data: "id", title: "ID" },
              {
                data: "username",
                title: "Username",
              },
              {
                data: "name",
                title: "Name",
              },
              {
                data: "email",
                title: "Email",
              },
              {
                data: "created_at",
                title: "Created At",
                render: (data) => dayjs.unix(data).format("DD-MM-YYYY HH:mm"),
              },
              {
                title: "Created By",
                render: (_data, row) => (
                  <span>{row?.user?.name}</span>
                ),
              },
            ]}
            mainColumns={[3, 4]}
            extraParams={{}}
            defaultOrder={{ field: "id", direction: "desc" }}
          />
        </div>
		</div>
	)
}

export default Dashboard;