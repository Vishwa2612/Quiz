import "../input.css";
import { auth } from "../../firebase";
import quizIcon from "../images/quiz.png";
import { SearchIcon } from "lucide-react";
import { useHistory } from "react-router-dom";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

const Header = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [searchLink, setSearchLink] = useState("")
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        if (auth.currentUser) {
          await auth.currentUser.reload();
          const updatedUser = auth.currentUser;
          setUserName(updatedUser.displayName || "Buddy");
        } else {
          setUserName("");
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserName();
  }, [auth.currentUser]);

  const handleSearch = () => {
      if (searchLink) {
        const decodedLink = decodeURIComponent(searchLink);
          history.push(`/display-questions/${decodedLink}`);
      }
  }

  const navigateToInstructions = () => {
    history.push("/instructions");
  };
    return (
        <div className="p-5 pl-[50px] border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between  p-4">
                <p className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={quizIcon} className="h-10" alt="Quiz App" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#DAA520]">
                        Quiz App
                    </span>
                </p>
                <span className="text-[#DAA520]">Welcome, {userName}</span>
                <button
                  className="ml-4 text-[#DAA520] cursor-pointer"
                  onClick={navigateToInstructions}
                >Instructions</button>
                <div className="flex flex-row items-center pr-4 border border-black rounded-[100px] hover:border-white">
                    <Input
                        type="text"
                        placeholder="search"
                        className="w-96 h-10 text-[15px] border-none"
                        value={searchLink}
                        onChange={(e) => setSearchLink(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSearch();
                          }
                        }}
                    />
                    <SearchIcon className="cursor-pointer" onClick={handleSearch}/>
                </div>
            </div>
        </div>
    );
};

export default Header;
