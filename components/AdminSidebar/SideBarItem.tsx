import { Collapse, List, ListItemIcon, Typography } from "@mui/material";
import { SideBarItemContainer } from "./styles";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SideBarItemProps {
  children: React.ReactNode;
  isActive?: boolean;
  icon: React.ReactNode;
  nested?: boolean;
  option?: OptionItem[];
  navigate?: string;
}

interface OptionItem {
  optionlabel: string;
  optionhref: string;
  optionActive: boolean;
}

export const SideBarItem: React.FC<SideBarItemProps> = ({
  children,
  isActive,
  icon,
  nested = false,
  option,
  navigate,
}) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const onClickNavigate = () => {
    router.push(navigate ? navigate : "");
  };

  const optionNavigate = (nav: string) => {
    router.push(nav);
  };

  const openNest = () => {
    setOpen(!open);
  };

  if (!nested) {
    return (
      <SideBarItemContainer
        onClick={onClickNavigate}
        sx={{
          backgroundColor: isActive ? "primary.main" : "",
          "&:hover": {
            backgroundColor: isActive ? "primary.main" : "secondary.main",
          },
        }}
      >
        <ListItemIcon
          sx={{
            color: isActive ? "black" : "white",
            minWidth: "0",
            marginRight: "12px",
          }}
        >
          {icon}
        </ListItemIcon>
        <Typography fontSize={"16px"} color={isActive ? "black" : "white"}>
          {children}
        </Typography>
      </SideBarItemContainer>
    );
  }
  // NESTED LIST
  else {
    return (
      <>
        <SideBarItemContainer
          onClick={openNest}
          sx={{
            backgroundColor: isActive ? "primary.main" : "",
            "&:hover": {
              backgroundColor: isActive ? "primary.main" : "secondary.main",
            },
          }}
        >
          <ListItemIcon
            sx={{
              color: isActive ? "black" : "white",
              minWidth: "0",
              marginRight: "12px",
            }}
          >
            {icon}
          </ListItemIcon>
          <Typography fontSize={"16px"} color={isActive ? "black" : "white"}>
            {children}
          </Typography>
          {nested &&
            (open ? (
              <ExpandLess
                sx={{
                  color: isActive ? "black" : "white",
                }}
              />
            ) : (
              <ExpandMore
                sx={{
                  color: isActive ? "black" : "white",
                }}
              />
            ))}
        </SideBarItemContainer>
        {nested && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {option?.map((optionItem, index) => (
                <SideBarItemContainer
                  onClick={() => optionNavigate(optionItem?.optionhref)}
                  key={index}
                  sx={{
                    paddingLeft: "54px",
                    backgroundColor: optionItem.optionActive ? "#5c5c5c" : "",
                    "&:hover": {
                      backgroundColor: optionItem.optionActive
                        ? "#5c5c5c"
                        : "secondary.main",
                    },
                  }}
                >
                  <Typography
                    fontSize={"14px"}
                    color={optionItem?.optionActive ? "white" : "white"}
                  >
                    {optionItem?.optionlabel} {optionItem.optionActive}
                  </Typography>
                </SideBarItemContainer>
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  }
};
