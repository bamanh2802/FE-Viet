import React, { useEffect } from "react";
import { Select, SelectItem, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Switch } from "@nextui-org/react";
import { MoonIcon } from "../icon/MoonIcon";
import { SunIcon } from "../icon/SunIcon";
import { useTheme } from "next-themes";
import useDarkMode from "@/src/hook/useDarkMode";
import { Logout, getUser, refreshToken } from "@/service/apis";
import { useRouter } from "next/router";
import { User } from "@/src/types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { setUser } from "@/src/userSlice";



const languages = [
  { key: "Vietnamese", label: "Tiếng Việt" },
  { key: "English", label: "English" },
];

const UserDropdown = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if(!user.user_id) {
      handleGetUser();
    }
  }, [])

  const handleGetUser = async () => {
    try {
      const data = await getUser()
      dispatch(setUser(data.data.msg));
    } catch (e) {
        console.log(e)
    }
  }

  const handleTheme = () => {
    toggleDarkMode();
    if (isDarkMode) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const handleLogout = async () => {
    try {
      const data = await Logout();
      console.log(data);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          name={user?.last_name}
          size="sm"
          showFallback
        />
      </DropdownTrigger>
      <DropdownMenu closeOnSelect={false} aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2" aria-label="Profile Info">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings" aria-label="My Settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings" aria-label="Team Settings">Team Settings</DropdownItem>
        <DropdownItem key="theme" aria-label="Theme Settings">
          <div className="flex justify-between items-center">
            Theme
            <Switch
              isSelected={!isDarkMode}
              size="sm"
              startContent={<SunIcon />}
              endContent={<MoonIcon />}
              onClick={handleTheme}
            />
          </div>
        </DropdownItem>
        <DropdownItem key="analytics" aria-label="Analytics">Analytics</DropdownItem>
        <DropdownItem key="system" aria-label="System Settings">System</DropdownItem>
        <DropdownItem key="configurations" aria-label="Configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback" aria-label="Help & Feedback">Help & Feedback</DropdownItem>
        <DropdownItem onClick={handleLogout} key="logout" color="danger" aria-label="Log Out">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  
  );
};

export default UserDropdown;
