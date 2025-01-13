import React, { isValidElement } from "react";
import { getNestedProperty } from "../utils/constants";

type Render = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data: any, row: any): React.ReactNode;
};

type Rows = {
  title: string;
  data: string;
  render?: Render;
};

export type DetailCardProps = {
  rows: Rows[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export const DetailCard = ({
  rows = [
    {
      title: "",
      data: "",
    },
  ],
  data = {},
}: DetailCardProps) => {
  return (
    <div className="flex flex-col shadow-lg rounded-lg p-6 bg-white border-l-4 border-blue-400 mb-6">
      <table>
        <thead>
          <tr>
            <th className="w-1 text-nowrap"></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="[&>tr:nth-of-type(odd)]:bg-gray-200">
          {rows.map((row: Rows, i) => (
            <tr key={i}>
              <td className="w-1 py-2 font-bold pl-3 text-nowrap">
                {row.title}
              </td>
              <td className="pl-9 py-2 pr-3">
                <div className="flex">
                  <div className="mr-1">:</div>
                  {isValidElement(row.render)
                    ? row.render(getNestedProperty(data, row.data), data)
                    : typeof row.render === "function"
                    ? row.render(getNestedProperty(data, row.data), data) !==
                      undefined
                      ? row.render(getNestedProperty(data, row.data), data)
                      : getNestedProperty(data, row.data)
                    : getNestedProperty(data, row.data)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
