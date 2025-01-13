import { getNestedProperty } from "../utils/constants";
import { isValidElement, useEffect, useState } from "react";
import {
  Body,
  Cell,
  Data,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
  TableNode,
} from "@table-library/react-table-library/table";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  useSort,
  HeaderCellSort,
  SortToggleType,
} from "@table-library/react-table-library/sort";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { Pagination, Spinner } from "@nextui-org/react";
import { TbSearch } from "react-icons/tb";
import { CardNotFound } from "./CardNotFound";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import http from "../services/api";

interface Render {
  (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    row: TableNode,
    pageInfo: PageInfo,
    index: number
  ): React.ReactNode;
}

// Define types for props and state
interface Column {
  title: string;
  data?: string;
  orderable?: boolean;
  render?: Render;
  titleAlign?: string;
  sortKey?: string;
}

interface PageInfo {
  total: number;
  page: number;
  size: number;
}

interface DefaultOrder {
  field: string;
  direction: "asc" | "desc";
}

export interface DataTableProps {
  queryKey?: string[];
  pageSizes?: number[];
  columns: Column[];
  dataPath?: string;
  defaultOrder?: DefaultOrder;
  apiURL: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraParams?: Record<string, any> | null;
  mainColumns?: number[];
}

// interface TableData {
//   records_total?: number;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [key: string]: any;
// }

export const DataTable = ({
  queryKey = ["dataTable"],
  pageSizes = [10, 20, 50],
  columns,
  dataPath,
  defaultOrder = { field: "id", direction: "desc" },
  apiURL,
  extraParams = null,
  mainColumns = [],
}: DataTableProps) => {
  const queryClient = useQueryClient();

  const [dataInfo, setDataInfo] = useState<{ records_total: number | null }>({
    records_total: null,
  });

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    total: 0,
    page: 0,
    size: 10,
  });

  const [sortState, setSortState] = useState<DefaultOrder>(defaultOrder);

  const [search, setSearch] = useState<string | undefined>("");

  const gridTemplateColumns = columns
    .map((_, index) => (mainColumns.includes(index) ? "2fr" : "0.3fr"))
    .join(" ");

  const tableTheme = useTheme({
    Table: `
      --data-table-library_grid-template-columns: ${gridTemplateColumns};
    `,
  });

  const {
    data: tableData,
    isLoading: loading,
    isFetching,
  } = useQuery({
    queryKey: [
      ...queryKey,
      pageInfo.page,
      pageInfo.size,
      sortState.direction,
      sortState.field,
    ],
    queryFn: async () => {
      const res = await http.get(apiURL, {
        params: {
          skip: pageInfo.page * pageInfo.size,
          limit: pageInfo.size,
          search: search,
          "order-by": sortState.field,
          "order-dir": sortState.direction,
          ...(extraParams ?? {}),
        },
      });

      setDataInfo({ records_total: res.data.data.records_total });

      return res.data.data;
    },
  });

  useEffect(() => {
    if (tableData?.records_total) {
      setPageInfo((prev) => ({
        ...prev,
        total: tableData?.records_total ?? 0,
      }));
      setDataInfo({ records_total: tableData?.records_total });
    }

    console.log("tableData", tableData);
  }, [tableData]);

  const data: Data<TableNode> = {
    nodes: getNestedProperty(tableData, dataPath) ?? [],
  };

  const pagination = usePagination(
    data,
    {
      state: {
        page: pageInfo.page,
        size: pageInfo.size,
      },
      onChange: (_action, state) => {
        setPageInfo((prev) => ({
          ...prev,
          page: state.page,
          size: state.size,
        }));
      },
    },
    { isServer: true }
  );

  const sort = useSort(
    data,
    {
      onChange: (_action, state) => {
        if (state.sortKey !== "NONE") {
          setSortState({
            field: state.sortKey as string,
            direction: state.reverse ? "desc" : "asc",
          });
        } else {
          setSortState(defaultOrder);
        }
      },
    },
    {
      sortFns: {},
      sortToggleType: SortToggleType.AlternateWithReset,
      sortIcon: {
        iconDefault: <FaSort fontSize="small" />,
        iconUp: <FaSortUp fontSize="small" />,
        iconDown: <FaSortDown fontSize="small" />,
      },
      isServer: true,
    }
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPageInfo((prev) => ({ ...prev, page: 0 }));
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    queryClient.invalidateQueries({ queryKey: [...queryKey] });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <select
          onChange={(e) => {
            setPageInfo((prev) => ({
              ...prev,
              size: Number(e.target.value),
            }));
          }}
          value={pagination.state.size}
          className="w-fit h-fit outline-none py-2 px-4 bg-gray-200 text-gray-800 rounded-lg">
          {pageSizes.map((pageSize, i) => (
            <option key={i} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <form
          className="flex items-center gap-2 py-2 px-4 mb-3 bg-gray-200 text-gray-800 rounded-lg w-full md:max-w-80"
          onSubmit={handleSearchSubmit}>
          <button onClick={handleSearchSubmit}>
            <TbSearch size={20} className="text-gray-400" />
          </button>
          <input
            className="w-full outline-none bg-gray-200"
            type="text"
            placeholder="Cari data"
            value={search}
            onChange={handleSearchChange}
          />
          <button className="hidden" type="submit" />
        </form>
      </div>
      <Table
        className={"!table-fixed"}
        data={data}
        pagination={pagination}
        sort={sort}
        theme={tableTheme}
        layout={{ fixedHeader: false, custom: true }}>
        {(tableList: TableNode[]) => (
          <>
            <Header>
              <HeaderRow className="!bg-gray-200 !text-gray-600 !leading-normal">
                {columns.map((column, i) =>
                  column.orderable !== false ? (
                    <HeaderCellSort
                      key={i}
                      sortKey={
                        column.sortKey ? column.sortKey : String(column.data)
                      }
                      className={`!py-3 !px-6 !text-left ${
                        i === 0
                          ? "rounded-l-lg"
                          : i === columns.length - 1
                          ? "rounded-r-lg"
                          : ""
                      }`}>
                      {column.title}
                    </HeaderCellSort>
                  ) : (
                    <HeaderCell
                      key={i}
                      className={
                        column.title
                          ? `!py-3 !px-6 !text-left ${
                              i === 0
                                ? "rounded-l-lg"
                                : i === columns.length - 1
                                ? "rounded-r-lg"
                                : ""
                            }`
                          : ""
                      }>
                      {column.title}
                    </HeaderCell>
                  )
                )}
              </HeaderRow>
            </Header>
            <Body>
              {!(loading || isFetching) ? (
                tableList.length > 0 && loading === false ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  tableList.map((item: any, index) => (
                    <Row
                      key={index}
                      item={item}
                      className="group border-b border-gray-200 even:bg-gray-50">
                      {columns.map((column: Column, i) => (
                        <Cell
                          key={i}
                          className="!py-1.5 !px-6 text-left align-top !items-start max-w-4xl">
                          {isValidElement(column.render)
                            ? column.render(
                                getNestedProperty(item, column.data),
                                item,
                                pageInfo,
                                index
                              )
                            : typeof column.render === "function"
                            ? column.render(
                                getNestedProperty(item, column.data),
                                item,
                                pageInfo,
                                index
                              ) !== undefined
                              ? column.render(
                                  getNestedProperty(item, column.data),
                                  item,
                                  pageInfo,
                                  index
                                )
                              : getNestedProperty(item, column.data)
                            : getNestedProperty(item, column.data)}
                        </Cell>
                      ))}
                    </Row>
                  ))
                ) : (
                  <Cell
                    gridColumnStart={1}
                    gridColumnEnd={100}
                    className="h-[20rem] *:!h-full *:flex *:items-center *:justify-center *:flex-col">
                    <CardNotFound
                      className="my-8"
                      size="md"
                      message="Data kosong / Tidak ditemukan"
                    />
                  </Cell>
                )
              ) : (
                <Cell
                  gridColumnStart={1}
                  gridColumnEnd={100}
                  className="h-[30.6rem] *:!h-full *:flex *:items-center *:justify-center *:flex-col">
                  <Spinner size="lg" />
                  <span className="font-medium mt-3">Loading data..</span>
                </Cell>
              )}
            </Body>
          </>
        )}
      </Table>
      <div className="flex flex-col md:flex-row md:items-center items-center gap-2 justify-between mt-3">
        <div>
          {`Showing ${Math.min(
            pageInfo.page * pageInfo.size + 1,
            pageInfo.total
          )} to ${Math.min(
            pageInfo.page * pageInfo.size + pageInfo.size,
            dataInfo?.records_total ?? 0
          )} of ${dataInfo?.records_total ?? 0} entries`}
        </div>
        <Pagination
          classNames={{
            item: "bg-gray-200 text-gray-800",
            cursor: "bg-blue-500 text-white",
          }}
          showControls
          initialPage={1}
          total={
            (dataInfo?.records_total ?? 0) > 0
              ? Math.ceil((dataInfo?.records_total ?? 0) / pageInfo.size)
              : 1
          }
          page={pageInfo.page + 1}
          onChange={(page) =>
            setPageInfo((prev) => ({ ...prev, page: page - 1 }))
          }
        />
      </div>
    </div>
  );
};
