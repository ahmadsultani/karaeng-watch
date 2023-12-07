import { Box, Button, MenuItem, TextField } from "@mui/material";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { useRouter, useSearchParams } from "next/navigation";
import { IOrder, TOrderStatus } from "@/interfaces/order";
import { formatDate, formatToHour } from "@/utils/formatter";

interface OrderTableProps {
  data: IOrder[];
  changeStatus: (id: string, status: TOrderStatus) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({
  data,
  changeStatus,
}) => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const handleStatusChange = async (id: string, status: TOrderStatus) => {
    if (!status || status === searchParams.get("status")) return;
    await changeStatus(id, status);
  };

  const table = useMaterialReactTable({
    columns,
    data,
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
        <TextField
          size="small"
          color="primary"
          value={row.original.status}
          onChange={(e) =>
            handleStatusChange(row.original.id, e.target.value as TOrderStatus)
          }
          select
        >
          <MenuItem value="waiting">Waiting</MenuItem>
          <MenuItem value="delivered">Delivered</MenuItem>
          <MenuItem value="done">Done</MenuItem>
          <MenuItem value="canceled">Canceled</MenuItem>
        </TextField>
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
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "user.uid",
    header: "Customer ID",
  },
  {
    header: "Customer Name",
    accessorFn: ({ user }) => `${user.firstName} ${user.lastName}`,
  },
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
    accessorKey: "updatedAt",
    header: "Updated At",
    accessorFn: ({ updatedAt }) => {
      return updatedAt
        ? `${formatToHour(updatedAt)} - ${formatDate(updatedAt, "short")}`
        : "-";
    },
  },
];
