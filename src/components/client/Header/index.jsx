import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import { useFavor } from "../../../context/FavorProvider";
import { BsFillCartFill } from "react-icons/bs";

function Header() {
  const { isLogin } = useContext(AppContext);
  const { favors, myHearthSvg, myCartSvg, myProfileSvg } = useFavor();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // const mySearchWord = e.target.value.toLowerCase();
    // if (mySearchWord && mySearchWord !== "") {
    //   setMyInputBool(true);
    //   const mySearchResults = data.filter((item) =>
    //     item.title.toLowerCase().includes(mySearchWord)
    //   );
    //   setMySearched(mySearchResults);
    // } else {
    //   setMyInputBool(false);
    // }
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">ClothesStore</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/contact">Liên hệ</Link>
          </li>
        </ul>
      </div>
      <div className={styles.navbarFormContainer}>
        <form action="">
          <FormControl id="search">
            <InputGroup>
              <Input
                className={styles.searchInput}
                type="search"
                placeholder="Tìm kiếm..."
                onChange={handleSearchSubmit}
              />
              <InputRightElement
                children={
                  <span className={styles.SearchFormSubmit}>&#128269;</span>
                }
              />
            </InputGroup>{" "}
          </FormControl>
        </form>
      </div>
      <div className={styles.right}>
        {!isLogin && (
          <>
            <Link to="/signin">
              <Button className={styles.registerBtns} colorScheme="purple">
                Đăng nhập
              </Button>
            </Link>
            <Link className="registerLink" to="/signup">
              <Button className={styles.registerBtns} colorScheme="purple">
                Đăng ký
              </Button>
            </Link>
          </>
        )}
        {isLogin && (
          <>
            {favors.length > 0 && (
              <Link to="/favor">
                <Button colorScheme="purple" variant="outline">
                  {myHearthSvg}
                  <sup>{favors.length}</sup>
                </Button>
              </Link>
            )}
            {/* {items.length > 0 && (
            <Link to="/basket">
              <Button colorScheme="purple" variant="outline">
                {myCartSvg} <sup>{items.length}</sup>
              </Button>
            </Link>
          )} */}
            {/* {user?.role === "admin" && (
            <Link to="/admin">
              <Button colorScheme="purple" variant="outline" fontSize="small">
                Admin
              </Button>
            </Link>
          )} */}
            <Link to="/profile">
              <Button colorScheme="purple">{myProfileSvg}</Button>
            </Link>
          </>
        )}
        <Link to="/favor">
          <Button colorScheme="purple" variant="outline">
            <BsFillCartFill />
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
