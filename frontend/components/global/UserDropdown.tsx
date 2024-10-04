import React, { useEffect } from "react";
import { Select, SelectItem, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Switch } from "@nextui-org/react";
import { MoonIcon } from "../icon/MoonIcon";
import { SunIcon } from "../icon/SunIcon";
import { useTheme } from "next-themes";
import useDarkMode from "@/src/hook/useDarkMode";
import { Logout, getUser } from "@/service/apis";
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
          color="secondary"
          name={user?.username}
          size="sm"
          src="https://scontent.fhan14-3.fna.fbcdn.net/v/t1.15752-9/458197052_1236440294376177_6824711196797531216_n.png?_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_ohc=iiV5NdYpcQoQ7kNvgHfMbLi&_nc_ht=scontent.fhan14-3.fna&oh=03_Q7cD1QFQOyEG2hWyk7qxQLsWicGk13o2kUO7XyQIJVZQzSbZAw&oe=67026137"
        />
      </DropdownTrigger>
      <DropdownMenu closeOnSelect={false} aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="theme">
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
        <DropdownItem key="language">
          <Select isRequired defaultSelectedKeys={["Vietnamese"]} className="max-w-xs">
            {languages.map((language) => (
              <SelectItem key={language.key}>{language.label}</SelectItem>
            ))}
          </Select>
        </DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem onClick={handleLogout} key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
