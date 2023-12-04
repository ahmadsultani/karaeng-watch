import { Box, IconButton } from "@mui/material";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { IUser } from "@/interfaces/user";

import { formatToHour, formatDate } from "@/utils/formatter";
import { PersonAdd, PersonRemove } from "@mui/icons-material";

interface UserTableProps {
  data: IUser[];
  toggleSignAsAdmin: (user: IUser) => void;
  toggleDemoteAdmin: (user: IUser) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  data,
  toggleSignAsAdmin,
  toggleDemoteAdmin,
}) => {
  const table = useMaterialReactTable({
    columns,
    data,
    initialState: {
      sorting: [
        {
          id: "role",
          desc: false,
        },
        {
          id: "firstName",
          desc: false,
        },
      ],
    },
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
        {row.original.role === "super-admin" && null}
        {row.original.role === "user" && (
          <IconButton
            title="Sign As Admin"
            color="primary"
            onClick={() => toggleSignAsAdmin(row.original)}
          >
            <PersonAdd />
          </IconButton>
        )}
        {row.original.role === "admin" && (
          <IconButton
            title="Demote Admin"
            color="default"
            onClick={() => toggleDemoteAdmin(row.original)}
          >
            <PersonRemove />
          </IconButton>
        )}
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

const columns: MRT_ColumnDef<IUser>[] = [
  {
    accessorKey: "uid",
    header: "ID",
  },

  {
    accessorKey: "firstName",
    header: "Name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
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
