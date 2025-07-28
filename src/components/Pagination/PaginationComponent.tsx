import { Pagination } from "@mui/material";
import SelectStatic from "../Form/SelectStatic";

interface IPaginationProps {
    itemsPerPage: number;
    totalData: number;
    callbackSelectedPageNumber: (v: any) => void
    callbackPagination: (v: any) => void
}
export default function PaginationComponent({ itemsPerPage, totalData, callbackSelectedPageNumber, callbackPagination }: IPaginationProps) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-3 text-white items-center">
        Per Page:
        <SelectStatic
          placeholder="Select Number of Cards"
          deafultValue={itemsPerPage.toString()}
          configData={[
            { key: "9", value: "9" },
            { key: "18", value: "18" },
            { key: "27", value: "27" },
          ]}
          callbackSelected={callbackSelectedPageNumber}
          style={{
            "& .MuiSelect-select": {
              paddingTop: "0px",
              paddingRight: "32px !important",
              paddingBottom: "0px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              border: "none",
              color: "var(--color-white)",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid var(--color-white)",
            },
            "& .MuiSvgIcon-root": {
              color: "var(--color-white)",
            },
          }}
        />
      </div>
      <Pagination
        count={Math.floor(totalData / itemsPerPage)}
        variant="outlined"
        shape="rounded"
        onChange={(e, page) => callbackPagination(page)}
      />
    </div>
  );
}
