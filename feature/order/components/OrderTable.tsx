import { Box, Button } from "@mui/material";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { useRouter, useSearchParams } from "next/navigation";
import { IOrder } from "@/interfaces/order";
import { formatDate, formatToHour } from "@/utils/formatter";

interface OrderTableProps {
  data: IOrder[];
}

export const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
  const searchParams = useSearchParams();
  const orderFiltered = data.filter(
    (item) => item.status === searchParams.get("status"),
  );

  const router = useRouter();

  const table = useMaterialReactTable({
    columns,
    data: orderFiltered,
    enableEditing: true,
    enableRowActions: true,
    enableRowSelection: false,
    positionActionsColumn: "last",
    muiTablePaperProps: {
      elevation: 0,
    },
    enableFullScreenToggle: false,
    enableStickyFooter: true,
    renderRowActions: ({ row }) => (
      <Box
        display="flex"
        flexWrap="nowrap"
        alignItems="center"
        gap="12px"
        flexShrink={0}
      >
        <Button
          size="small"
          color="primary"
          onClick={() => router.push(`admin/order/${row.original.id}`)}
        >
          Detail
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

const columns: MRT_ColumnDef<IOrder>[] = [
  {
    accessorKey: "createdAt",
    header: "Order Date",
    accessorFn: ({ createdAt }) => {
      return createdAt
        ? `${formatToHour(createdAt)} - ${formatDate(createdAt, "short")}`
        : "-";
    },
  },
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "userID",
    header: "Customer ID",
  },
  {
    accessorKey: "user.firstName",
    header: "Customer Name",
    accessorFn: (rowData) =>
      `${rowData.user.firstName} ${rowData.user.lastName}`,
  },

  {
    accessorKey: "status",
    header: "Status",
  },
];
