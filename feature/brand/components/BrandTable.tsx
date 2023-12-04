import { Box, IconButton } from "@mui/material";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { IBrand } from "@/interfaces/brand";

import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { formatToHour, formatDate } from "@/utils/formatter";

interface BrandTableProps {
  data: IBrand[];
  toggleDeleteOpen: (brand: IBrand) => void;
}

export const BrandTable: React.FC<BrandTableProps> = ({
  data,
  toggleDeleteOpen,
}) => {
  const router = useRouter();

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
        <IconButton
          color="primary"
          onClick={() => router.push(`/admin/brand/edit/${row.original.id}`)}
        >
          <EditOutlined />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => toggleDeleteOpen(row.original)}
        >
          <DeleteOutline />
        </IconButton>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

const columns: MRT_ColumnDef<IBrand>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    accessorFn: (row) =>
      !!row.createdAt
        ? `${formatToHour(row.createdAt)}, ${formatDate(
            row.createdAt,
            "short",
          )}`
        : "-",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    accessorFn: (row) =>
      !!row.updatedAt
        ? `${formatToHour(row.updatedAt)}, ${formatDate(
            row.updatedAt,
            "short",
          )}`
        : "-",
  },
];
