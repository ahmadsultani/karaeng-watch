import { IconButton } from "@mui/material";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { IProduct } from "@/interfaces/product";

import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface TableProps {
  data: IProduct[];
  toggleDeleteOpen: (product: IProduct) => void;
}

export const Table: React.FC<TableProps> = ({ data, toggleDeleteOpen }) => {
  const router = useRouter();

  const table = useMaterialReactTable({
    columns,
    data: data || [],
    enableEditing: true,
    enableRowActions: true,
    enableRowSelection: false,
    positionActionsColumn: "last",
    muiTablePaperProps: {
      elevation: 0,
    },
    enableColumnResizing: false,
    enableFullScreenToggle: false,
    enableStickyFooter: true,
    renderRowActions: ({ row }) => (
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        <IconButton
          color="primary"
          onClick={() => router.push(`/admin/product/edit/${row.original.id}`)}
        >
          <EditOutlined />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => toggleDeleteOpen(row.original)}
        >
          <DeleteOutline />
        </IconButton>
      </div>
    ),
  });

  return <MaterialReactTable table={table} />;
};

const columns: MRT_ColumnDef<IProduct>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "brand.name",
    header: "Brand",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "sold",
    header: "Sold",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
